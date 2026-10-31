#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const ISO = {
  austria:'AT', belgium:'BE', bulgaria:'BG', croatia:'HR', cyprus:'CY', czechia:'CZ', denmark:'DK', estonia:'EE', finland:'FI', france:'FR', germany:'DE', greece:'GR', hungary:'HU', iceland:'IS', ireland:'IE', italy:'IT', latvia:'LV', liechtenstein:'LI', lithuania:'LT', luxembourg:'LU', malta:'MT', netherlands:'NL', norway:'NO', poland:'PL', portugal:'PT', romania:'RO', slovakia:'SK', slovenia:'SI', spain:'ES', sweden:'SE', switzerland:'CH'
};
const primaryFiles = ['candidate-manifest.json','source-register.json','source-catalog.json','source-review-manifest.json','pack-manifest.json','manifest.json'];
const arrayFields = ['entries','documents','sources','records'];
const statusOrder = ['accepted_external_reference','accepted_local_copy','pending','candidate','discovery','historical','not_relied_upon','other'];
const tidy = value => String(value ?? '').trim();
const slug = value => tidy(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90) || 'record';
const digest = value => createHash('sha256').update(String(value)).digest('hex');
const parseJson = async file => JSON.parse(await readFile(file,'utf8'));
const sourceId = item => {
  if (typeof item === 'string') return item;
  if (!item || typeof item !== 'object') return '';
  return tidy(item.id || item.source_id || item.sourceId || item.record_id || item.recordId || item.candidate_id || item.key);
};
const collectStrings = (value, keys, found = []) => {
  if (!value || typeof value !== 'object') return found;
  for (const [key, child] of Object.entries(value)) {
    if (keys.has(key.toLowerCase()) && typeof child === 'string' && child.trim()) found.push(child.trim());
    else if (child && typeof child === 'object') collectStrings(child, keys, found);
  }
  return found;
};
const URL_KEYS = new Set(['url','official_url','canonical_url','source_url','external_url','rediscovery_url','resolved_url','acquisition_url','uri','href']);
const PATH_KEYS = new Set(['document_path','local_path','local_copy_path','artifact_path','relative_path','file_path','path','original_combined_pack_path','candidate_text_path','source_text_path','accepted_local_copy_path','capture_path']);
const LANGUAGE_KEYS = new Set(['language','languages','lang']);
const LANGUAGE_NAMES = {
  bg:['bulgarian'], cs:['czech'], da:['danish'], de:['german'], el:['greek'], en:['english'], es:['spanish'], et:['estonian'],
  fi:['finnish'], fr:['french'], ga:['irish'], hr:['croatian'], hu:['hungarian'], is:['icelandic'], it:['italian'],
  lt:['lithuanian'], lv:['latvian'], mt:['maltese'], nl:['dutch','flemish'], no:['norwegian'], pl:['polish'], pt:['portuguese'],
  ro:['romanian'], sk:['slovak'], sl:['slovenian'], sv:['swedish'], tr:['turkish'], sq:['albanian'], ar:['arabic']
};
function languageCodes(value) {
  const raw=tidy(value);
  if(!raw) return ['unspecified'];
  if(/^[a-z]{2}(?:-[A-Z]{2})?$/i.test(raw)) return [raw.slice(0,2).toLowerCase()];
  if(/^[a-z]{2}(?:-[a-z]{2})+$/i.test(raw)) return [...new Set(raw.split('-').map(code=>code.toLowerCase()))];
  if(/multilingual|multiple languages|other official journal language versions|official journal language versions|eu languages/i.test(raw)) return ['multilingual'];
  const normalized=raw.toLowerCase();
  const found=[];
  for(const [code,names] of Object.entries(LANGUAGE_NAMES)) if(names.some(name=>new RegExp(`\\b${name}\\b`,'i').test(normalized))) found.push(code);
  return found.length?[...new Set(found)]:['unspecified'];
}
const identityText = value => {
  const raw = String(value || '');
  const celex = raw.match(/(?:celex\s*[:=]?\s*)(\d{5}[A-Z][A-Z0-9]*)/i)?.[1]
    || raw.match(/[?&]uri=CELEX:(\d{5}[A-Z][A-Z0-9]*)/i)?.[1]
    || raw.match(/(?:^|:)(\d{5}[A-Z][A-Z0-9]*)$/i)?.[1];
  if (celex) return `eu:celex:${celex.toLowerCase()}`;
  const eli = raw.match(/https?:\/\/([^/]+)\/eli\/(dir|reg|dec|directive|regulation|decision)\/(\d{4})\/(\d+)(?:\/[^?#]*)?/i);
  if (eli) {
    const host=eli[1].toLowerCase(),kind=eli[2].toLowerCase(),year=eli[3],number=eli[4];
    if(host.endsWith('eur-lex.europa.eu')) { const letter=/^(?:dir|directive)$/.test(kind)?'L':/^(?:reg|regulation)$/.test(kind)?'R':'D'; return `eu:celex:3${year}${letter}${number.padStart(4,'0')}`.toLowerCase(); }
    return `eli:${host}:${kind}:${year}:${number}`;
  }
  return '';
};
function normalizedUrl(value) {
  try {
    const url = new URL(value);
    url.hash = '';
    url.hostname = url.hostname.toLowerCase().replace(/^www\./,'');
    url.protocol = 'https:';
    for (const key of [...url.searchParams.keys()]) if (/^(utm_|fbclid$|gclid$)/i.test(key)) url.searchParams.delete(key);
    url.searchParams.sort();
    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/$/,'');
    return url.toString();
  } catch { return ''; }
}
function editionOf(item, fallbackPath='') {
  const raw=[item?.edition,item?.version,item?.version_id,item?.current_version_date,item?.displayed_consolidation_date,item?.version_date,item?.date,item?.version_or_cutoff,item?.citation].map(tidy).find(Boolean)||'';
  const iso=raw.match(/\b20\d{2}-\d{2}-\d{2}\b/)?.[0]; if(iso) return iso;
  const local=raw.match(/\b(?:19|20)\d{2}\b/)?.[0];
  if(raw && raw.length<=48 && !/[.!?]/.test(raw)) return raw;
  if(local) return local;
  const pathDate=String(fallbackPath).match(/\b20\d{2}(?:[-_]\d{2}){0,2}\b/)?.[0]?.replaceAll('_','-');
  return pathDate||'undated';
}
function languagesOf(item, fallbackLanguage = 'unspecified') {
  const explicit = Array.isArray(item?.representations) ? item.representations.flatMap(r => languageCodes(r?.language)) : [];
  if (explicit.some(language => language !== 'unspecified')) return [...new Set(explicit.filter(language => language !== 'unspecified'))];
  const value = item?.languages ?? item?.language ?? item?.lang;
  let resolved;
  if (Array.isArray(value)) resolved = [...new Set(value.flatMap(languageCodes))];
  else {
    const raw = tidy(value);
    if (/^[a-z]{2}(?:-[A-Z]{2})?(?:\s*[/,]\s*[a-z]{2}(?:-[A-Z]{2})?)+$/i.test(raw)) resolved = [...new Set(raw.split(/[\/,]/).flatMap(languageCodes))];
    else resolved = languageCodes(raw);
  }
  if (resolved.some(language => language !== 'unspecified')) return [...new Set(resolved.filter(language => language !== 'unspecified'))];
  return fallbackLanguage && fallbackLanguage !== 'unspecified' ? [fallbackLanguage] : ['unspecified'];
}
function classifyText(value) {
  const text = String(value || '').toLowerCase();
  const out = new Set();
  if (/historical|superseded|legacy_only|historical_only/.test(text)) out.add('historical');
  if (/not_relied|not relied|not accepted|excluded|do not rely/.test(text)) out.add('not_relied_upon');
  if (/pending|unresolved|under review|review_required|refresh_required/.test(text)) out.add('pending');
  if (/discovery|catalogue|catalog_only|discovery_only/.test(text)) out.add('discovery');
  if (/accepted_external_reference|accepted_reference|usable_official_reference|link_only|external_reference_accepted|accepted_with_narrow_external_scope|accepted_by_link|accepted.{0,35}(?:link|reference)|usable by link/.test(text)) out.add('accepted_external_reference');
  if (/accepted_local_copy|local_copy_status.?accepted|accepted local|local_copy_accepted/.test(text)) out.add('accepted_local_copy');
  return out;
}
function statusForRecord(item, fallback = []) {
  const statuses = new Set(fallback);
  const statusFields = ['status','retrieval_status','local_copy_status','external_reference_status','reference_status','decision','disposition','seed_status','candidate_status','acceptance_status'];
  for (const field of statusFields) for (const status of classifyText(item?.[field])) statuses.add(status);
  if (item?.catalogue_reference?.table_headers && item?.catalogue_reference?.cells) {
    item.catalogue_reference.table_headers.forEach((header,index)=>{
      if(!/status|disposition|review decision|state/i.test(header)) return;
      const cell=tidy(item.catalogue_reference.cells[index]).toLowerCase();
      if(/^(?:pending|candidate|discovery|historical|superseded|not relied upon|not_accepted|accepted external reference|accepted official link|accepted by link|link.only)/.test(cell)) for(const status of classifyText(cell)) statuses.add(status);
    });
  }
  if (item?.accepted === true && (item?.document_path || item?.local_copy_status || item?.retrieved === true)) statuses.add('accepted_local_copy');
  if (item?.status === 'accepted' && (item?.document_path || item?.source_sha256 || item?.converted_sha256 || item?.accepted_local_copy_sha256 || item?.document_sha256)) statuses.add('accepted_local_copy');
  if (item?.decision && /accepted.*external|accepted_by_link|narrow_external_scope/i.test(String(item.decision))) statuses.add('accepted_external_reference');
  if (item?.external_reference_accepted === true || item?.accepted_external_reference === true || item?.external_reference_status === 'accepted') statuses.add('accepted_external_reference');
  if (item?.accepted_local_copy === true || item?.local_copy_accepted === true || item?.local_copy_status === 'accepted') statuses.add('accepted_local_copy');
  if (item?.local_copy_status && item.local_copy_status !== 'accepted') statuses.add('pending');
  if (item?.status && /candidate|located|lead/i.test(String(item.status))) statuses.add('candidate');
  if (item?.source_type && /discovery|catalog|index|portal/i.test(String(item.source_type))) statuses.add('discovery');
  if (item?.source_class && /discovery|catalog|index|portal/i.test(String(item.source_class))) statuses.add('discovery');
  return statusOrder.filter(status => statuses.has(status));
}
function directValues(item, keys) {
  if (!item || typeof item !== 'object') return [];
  return Object.entries(item).filter(([key,value]) => keys.has(key.toLowerCase()) && typeof value === 'string' && value.trim()).map(([,value]) => value.trim());
}
function normalizedArtifactPath(value, country) {
  let raw=tidy(value).replaceAll('\\','/').replace(/^\.\//,'');
  const prefix=`source-library/${country}/`;
  if(raw.startsWith(prefix)) raw=raw.slice(prefix.length);
  else if(raw.startsWith('source-library/')) raw=raw.slice('source-library/'.length);
  if(/^\.\/(?:documents|sources)\//.test(raw)) raw=raw.slice(2);
  else if(/^\.\.\/(?:documents|sources)\//.test(raw)) raw=raw.slice(3);
  if(raw.split('/').includes('..')) return '';
  return /^(documents|sources)\//.test(raw) ? raw : '';
}
function representationSpecs(item, sourceIdentityId, country, fallbackLanguage = 'unspecified') {
  const specs = [];
  if (Array.isArray(item?.representations) && item.representations.length) {
    for (const rep of item.representations) {
      const url = directValues(rep, URL_KEYS)[0] || '';
      const localPath = directValues(rep, PATH_KEYS).map(p=>normalizedArtifactPath(p,country)).find(Boolean) || '';
      for(const rawLanguage of languageCodes(rep?.language)) {
        const language = rawLanguage === 'unspecified' ? fallbackLanguage : rawLanguage;
        const edition = editionOf(rep,localPath);
        const location = localPath || `${normalizedUrl(url)}|${edition}` || `catalogue:${language}:${edition}`;
        specs.push({kind:localPath?'local_artifact':url?'official_reference':'catalogue_record',language,edition,url:url?normalizedUrl(url):null,path:localPath||null,representation_id:`${sourceIdentityId}#${localPath?'local':url?'url':'record'}:${slug(language)}:${digest(location).slice(0,12)}`,acceptance_status:statusForRecord(rep)});
      }
    }
  }
  const urls = [...new Set(directValues(item, URL_KEYS).map(normalizedUrl).filter(Boolean))];
  for(const rep of item?.representations||[]) for(const value of directValues(rep,URL_KEYS)) { const url=normalizedUrl(value); if(url&&!urls.includes(url)) urls.push(url); }
  const paths = [...new Set(directValues(item, PATH_KEYS).map(p=>normalizedArtifactPath(p,country)).filter(Boolean))];
  for(const rep of item?.representations||[]) for(const value of directValues(rep,PATH_KEYS)) { const p=normalizedArtifactPath(value,country); if(p&&!paths.includes(p)) paths.push(p); }
  const languages = languagesOf(item, fallbackLanguage);
  for (const url of urls) {
    for (const language of languages) {
      const edition = editionOf(item);
      const location = `${url}|${language}|${edition}`;
      const id = `${sourceIdentityId}#url:${slug(language)}:${digest(location).slice(0,12)}`;
      if (!specs.some(spec => spec.representation_id === id)) specs.push({kind:'official_reference',language,edition,url,path:null,representation_id:id,acceptance_status:statusForRecord(item)});
    }
  }
  for (const localPath of paths) {
    for (const language of languages) {
      const edition = editionOf(item,localPath);
      const id = `${sourceIdentityId}#local:${slug(language)}:${digest(`${localPath}|${edition}`).slice(0,12)}`;
      if (!specs.some(spec => spec.representation_id === id)) specs.push({kind:'local_artifact',language,edition,url:null,path:localPath,representation_id:id,acceptance_status:statusForRecord(item)});
    }
  }
  return specs;
}
function inferRecordIdentity(iso, id, item, urls) {
  const explicit = tidy(item?.canonical_source_identity || item?.canonical_identity || item?.source_identity || item?.eli || item?.celex || item?.CELEX || item?.identity_key);
  if (explicit) {
    const celex = identityText(explicit);
    return { key:celex || `${iso.toLowerCase()}:identity:${slug(explicit)}:${digest(explicit).slice(0,12)}`, resolved:true, basis:celex?'CELEX identifier':'explicit source identity field' };
  }
  for (const text of [item?.official_url,item?.url,item?.canonical_url,...urls].filter(Boolean)) {
    const stable = identityText(text);
    if (stable) return { key:stable, resolved:true, basis:stable.startsWith('eu:celex:')?'CELEX identifier':'ELI instrument identity' };
  }
  const url = normalizedUrl(urls[0] || '');
  if (url) return { key:`${iso.toLowerCase()}:url:${digest(url).slice(0,20)}`, resolved:true, basis:'catalogued official URL' };
  if (id && /^(?:sfs|migrfs):\d{4}:\d+$/i.test(id)) return { key:`${iso.toLowerCase()}:${id.toLowerCase()}`, resolved:true, basis:'official national instrument citation' };
  if (id && /^(?:mig):[A-Za-z0-9._/-]+$/i.test(id)) return { key:`${iso.toLowerCase()}:${id.toLowerCase()}`, resolved:true, basis:'official case identifier' };
  if (id) return { key:`${iso.toLowerCase()}:record:${slug(id)}:${digest(id).slice(0,12)}`, resolved:false, basis:'catalogue ID only; possible duplicate identity not checked' };
  return { key:`${iso.toLowerCase()}:unresolved:${digest(JSON.stringify(item||{})).slice(0,20)}`, resolved:false, basis:'no stable entry ID or official URL' };
}
function cells(line) { return line.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map(x=>x.trim()); }
function isSeparator(line) { return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim()); }
function sourceListRows(text, filePath) {
  const lines=text.split(/\r?\n/), rows=[];
  for(let i=0;i<lines.length-1;i++) {
    if(!lines[i].trim().startsWith('|') || !lines[i+1].trim().startsWith('|') || !isSeparator(lines[i+1])) continue;
    const header=cells(lines[i]);
    if(!/^(?:id|source\s*id|candidate\s*id|record\s*id)$/i.test(header[0]||'')) continue;
    const tableHeaders=header.map(x=>x.toLowerCase());
    for(let j=i+2;j<lines.length&&lines[j].trim().startsWith('|');j++) {
      if(isSeparator(lines[j])) continue;
      const row=cells(lines[j]); if(!row.length) continue;
      const rawId=(row[0].match(/`([^`]+)`/)||[,row[0]])[1].trim();
      if(!rawId || /^[-—–]$/.test(rawId) || /^(?:id|source id|candidate id)$/i.test(rawId)) continue;
      // Keep the candidate-manifest disposition visible without treating this tooling file as a legal source identity.
      if(/^candidate-manifest\.json$/i.test(rawId) && /^candidate id$/i.test(header[0]||'')) continue;
      const cellsByName=Object.fromEntries(tableHeaders.map((name,index)=>[name,row[index]||'']));
      const titleCell=row[tableHeaders.findIndex(name=>/title|official source|source record|source$/.test(name))] || row[1] || rawId;
      const url=[...row.join(' ').matchAll(/https?:\/\/[^\s)\]>|]+/g)].map(m=>m[0].replace(/[.,;]+$/,''))[0]||'';
      const cleanTitle=titleCell.replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/`/g,'').trim();
      rows.push({id:rawId,title:cleanTitle,official_url:url,catalogue_reference:{path:filePath,line:j+1,table_headers:header,cells:row},raw_source_list_status:row.join(' | ')});
    }
    i++; // the parser consumes this table in its inner loop
  }
  return rows;
}
function acceptanceStatuses(value, entryIds) {
  const statuses=new Map();
  const add=(id, state)=>{ if(!id||!state||!entryIds.has(id))return; if(!statuses.has(id))statuses.set(id,new Set()); statuses.get(id).add(state); };
  const keyState=key=>{
    const k=String(key||'').toLowerCase();
    if(/accepted_local_copy|local_copy_accept|accepted_artifact/.test(k)) return 'accepted_local_copy';
    if(/accepted_reference|accepted_candidate|accepted_external|usable_official/.test(k)) return 'accepted_external_reference';
    if(/pending|under_review/.test(k)) return 'pending';
    if(/not_relied|not_accepted|excluded/.test(k)) return 'not_relied_upon';
    if(/historical|superseded/.test(k)) return 'historical';
    return '';
  };
  const visit=(node,key='',contextId='')=>{
    if(Array.isArray(node)) { for(const child of node) { if(typeof child==='string'&&entryIds.has(child)) add(child,keyState(key)); else visit(child,key,contextId); } return; }
    if(!node||typeof node!=='object') return;
    const ownId=sourceId(node)||contextId;
    const state=keyState(key);
    if(ownId) {
      add(ownId,state);
      for(const field of ['status','retrieval_status','local_copy_status','external_reference_status','reference_status','decision','disposition','seed_status','acceptance_status']) for(const x of classifyText(node[field])) add(ownId,x);
      if(node.external_reference_accepted===true||node.accepted_external_reference===true||node.external_reference_status==='accepted') add(ownId,'accepted_external_reference');
      if(node.local_copy_status==='accepted'||node.accepted_local_copy===true||node.local_copy_accepted===true) add(ownId,'accepted_local_copy');
    }
    const recordMap=/^(?:official_reference_reviews|records|source_records|reference_records)$/i.test(key);
    for(const [childKey,child] of Object.entries(node)) {
      if(recordMap && entryIds.has(childKey) && child && !Array.isArray(child) && typeof child==='object') {
        visit(child,childKey,childKey);
      } else if(child && !Array.isArray(child) && typeof child==='object' && entryIds.has(childKey)) visit(child,childKey,childKey);
      else visit(child,childKey,ownId);
    }
  };
  visit(value);
  return Object.fromEntries([...statuses].map(([id,set])=>[id,statusOrder.filter(x=>set.has(x))]).filter(([,a])=>a.length));
}
function enrichTree(node, links, contextId='') {
  if(Array.isArray(node)) return node.map(item=>enrichTree(item,links,contextId));
  if(!node||typeof node!=='object') return node;
  const out={};
  const ownId=sourceId(node)||contextId;
  for(const [key,value] of Object.entries(node)) out[key]=enrichTree(value,links,ownId);
  const link=links[ownId];
  if(link) { out.source_identity_id=link.source_identity_id; out.representation_ids=link.representation_ids; }
  return out;
}
function findUrls(item) {
  const values=directValues(item,URL_KEYS);
  for(const rep of item?.representations||[]) values.push(...directValues(rep,URL_KEYS));
  return [...new Set(values.map(normalizedUrl).filter(Boolean))];
}
async function walkRegularFiles(directory) {
  const out=[];
  const visit=async dir=>{ for(const entry of await readdir(dir,{withFileTypes:true}).catch(()=>[])) { const full=path.join(dir,entry.name); if(entry.isDirectory()) await visit(full); else if(entry.isFile()) out.push(full); } };
  await visit(directory);
  return out;
}
function addToMap(map,id,item,ref) {
  if(!id) return;
  const prior=map.get(id)||{id,source_records:[],representations:[],statuses:new Set(),urls:new Set(),title:'',source_type:'',catalogue_references:[],acceptance_references:[]};
  if(item&&typeof item==='object') {
    if(!prior.title) prior.title=tidy(item.title||item.name||item.description||'');
    if(!prior.source_type) prior.source_type=tidy(item.source_type||item.class||item.source_class||item.type||'');
    prior.source_records.push(item);
    for(const url of findUrls(item)) prior.urls.add(url);
    for(const status of statusForRecord(item)) prior.statuses.add(status);
  }
  if(ref) prior[ref.category==='acceptance'?'acceptance_references':'catalogue_references'].push(ref);
  map.set(id,prior);
}
async function loadCountry(country, extraDocumentPaths = []) {
  const iso=ISO[country], refDir=path.join(ROOT,country,'references');
  const records=new Map(), sourceListPath=path.join(refDir,'source-list.md');
  const files=await readdir(refDir).catch(()=>[]);
  const listed=new Set();
  const primarySources=[...primaryFiles,'guidance-manifest.json'];
  for(const file of primarySources) {
    if(!files.includes(file)) continue;
    const filePath=path.join(refDir,file), data=await parseJson(filePath);
    for(const field of arrayFields) if(Array.isArray(data[field]) && !(file==='candidate-manifest.json' && data.source_identity_inventory_schema_version===1 && field==='entries')) for(let index=0;index<data[field].length;index++) {
      const item=data[field][index], id=sourceId(item);
      if(id) { addToMap(records,id,item,{path:`references/${file}`,json_pointer:`/${field}/${index}`}); listed.add(id); }
    }
  }
  let sourceListText='';
  try {
    sourceListText=await readFile(sourceListPath,'utf8');
    for(const row of sourceListRows(sourceListText,'references/source-list.md')) {
      addToMap(records,row.id,row,{...row.catalogue_reference,category:'catalogue'}); listed.add(row.id);
    }
  } catch(error) { if(error.code!=='ENOENT') throw error; }
  // Some packs keep their primary manifest at the jurisdiction root.
  const rootManifest=path.join(ROOT,country,'manifest.json');
  if(await readFile(rootManifest,'utf8').then(()=>true).catch(()=>false)) {
    const data=await parseJson(rootManifest);
    for(const field of arrayFields) if(Array.isArray(data[field])) for(let index=0;index<data[field].length;index++) { const item=data[field][index],id=sourceId(item); if(id){addToMap(records,id,item,{path:'manifest.json',json_pointer:`/${field}/${index}`});listed.add(id);} }
  }
  let acceptance={};
  if(files.includes('source-acceptance.json')) acceptance=await parseJson(path.join(refDir,'source-acceptance.json'));
  const catalogueRecordIds=new Set(records.keys());
  const accepted=acceptanceStatuses(acceptance,catalogueRecordIds);
  for(const [id,states] of Object.entries(accepted)) for(const state of states) records.get(id)?.statuses.add(state);
  const acceptanceRows=[];
  const recordFields=new Set(['official_reference_reviews','records','source_records','reference_records','accepted_local_copy_reviews','local_copy_reviews','local_copy_decisions','external_reference_decisions','source_decisions','accepted_references','pending_references','not_relied_upon','not_relied_upon_references','not_accepted_or_still_under_review']);
  for(const field of recordFields) {
    const value=acceptance[field];
    if(Array.isArray(value)) {
      for(let index=0;index<value.length;index++) { const record=value[index]; const id=sourceId(record); if(id&&record&&typeof record==='object') acceptanceRows.push({id,record,field,json_pointer:`/${field}/${index}`}); }
    } else if(value&&typeof value==='object') {
      for(const [id,record] of Object.entries(value)) if(record&&typeof record==='object'&&!Array.isArray(record)&&/^[A-Za-z0-9][A-Za-z0-9._:-]{1,100}$/.test(id)) acceptanceRows.push({id,record,field,json_pointer:`/${field}/${id}`});
    }
  }
  const statusRecordLinks=new Map();
  const mapState=field=>/accepted_local_copy_reviews|local_copy_reviews|local_copy_decisions/i.test(field)?'accepted_local_copy':/^accepted_references$/i.test(field)?'accepted_external_reference':/pending_references/i.test(field)?'pending':/not_relied|not_accepted/i.test(field)?'not_relied_upon':'';
  const bestPathTarget=(record)=>{
    const paths=directValues(record,PATH_KEYS).map(value=>normalizedArtifactPath(value,country)).filter(Boolean);
    const matches=[];
    for(const value of paths) {
      const base=path.basename(value,path.extname(value)).toLowerCase();
      for(const row of records.values()) {
        if(!catalogueRecordIds.has(row.id)) continue;
        const normalizedId=slug(row.id).toLowerCase();
        if(base===normalizedId||base.startsWith(`${normalizedId}-`)||base.startsWith(`${normalizedId}_`)) matches.push({row,length:normalizedId.length});
      }
    }
    if(!matches.length) return null;
    const max=Math.max(...matches.map(item=>item.length));
    const winners=[...new Map(matches.filter(item=>item.length===max).map(item=>[item.row.id,item.row])).values()];
    return winners.length===1?winners[0]:null;
  };
  for(const row of acceptanceRows) {
    const existing=records.get(row.id);
    const priorLinkedTarget=statusRecordLinks.get(row.id);
    let target=priorLinkedTarget?records.get(priorLinkedTarget):catalogueRecordIds.has(row.id)?existing:null;
    if(!target) {
      const urls=findUrls(row.record);
      const urlMatches=[...records.values()].filter(candidate=>catalogueRecordIds.has(candidate.id)&&urls.some(url=>candidate.urls.has(url)));
      if(urlMatches.length===1) target=urlMatches[0];
      if(!target) target=bestPathTarget(row.record);
    }
    if(target&&target.id!==row.id) {
      if(existing&&existing!==target) {
        target.source_records.push(...existing.source_records.map(item=>({...item,id:target.id})));
        target.statuses=new Set([...target.statuses,...existing.statuses]);
        target.urls=new Set([...target.urls,...existing.urls]);
        target.acceptance_references.push(...existing.acceptance_references.map(item=>({...item,status_record_id:item.status_record_id||row.id})));
        records.delete(row.id);
      }
      target.source_records.push({...row.record,id:target.id});
      target.acceptance_references.push({path:'references/source-acceptance.json',json_pointer:row.json_pointer,status_record_id:row.id,category:'acceptance'});
      statusRecordLinks.set(row.id,target.id);
    } else {
      if(!existing && !priorLinkedTarget) addToMap(records,row.id,{id:row.id,...row.record},{path:'references/source-acceptance.json',json_pointer:row.json_pointer,category:'acceptance'});
      else if(existing) { existing.source_records.push({...row.record,id:row.id}); existing.acceptance_references.push({path:'references/source-acceptance.json',json_pointer:row.json_pointer,category:'acceptance'}); }
      target=priorLinkedTarget?records.get(priorLinkedTarget):records.get(row.id);
    }
    if(target) {
      const state=mapState(row.field); if(state) target.statuses.add(state);
      for(const state of statusForRecord(row.record)) target.statuses.add(state);
    }
  }
  const idSet=new Set(records.keys());
  const identityLinkKey=value=>value==='identity_links';
  const scanAcceptance=(node,key='')=>{
    if(identityLinkKey(key)||/^(?:official_reference_reviews|records|source_records|reference_records|accepted_local_copy_reviews|local_copy_reviews|local_copy_decisions|external_reference_decisions|source_decisions|accepted_references|pending_references|not_relied_upon|not_relied_upon_references|not_accepted_or_still_under_review)$/i.test(key)) return;
    if(Array.isArray(node)) { for(const child of node) scanAcceptance(child,key); return; }
    if(!node||typeof node!=='object') return;
    const id=sourceId(node);
    if(id&&idSet.has(id)) for(const state of statusForRecord(node)) records.get(id).statuses.add(state);
    for(const [childKey,child] of Object.entries(node)) scanAcceptance(child,childKey);
  };
  scanAcceptance(acceptance);
  // Recompute all aliases after acceptance-only rows have been discovered.
  for(const row of records.values()) if(!statusOrder.some(state=>row.statuses.has(state))) row.statuses.add('candidate');
  // Link actual library files to a source record when the filename retains its existing ID.
  const documentRoot=path.join(ROOT,country,'documents');
  const documentFiles=await walkRegularFiles(documentRoot);
  for(const relative of extraDocumentPaths) {
    const normalized=String(relative).replaceAll('\\','/').replace(/^\.\//,'');
    if(!normalized.startsWith('documents/') || normalized.split('/').some(part=>part==='..')) throw new Error(`Invalid extra document path for ${country}: ${relative}`);
    documentFiles.push(path.resolve(ROOT,country,normalized));
  }
  for(const row of records.values()) {
    const normalizedId=slug(row.id).toLowerCase();
    for(const absolute of documentFiles) {
      const base=path.basename(absolute,path.extname(absolute)).toLowerCase();
      const suffix=base.startsWith(`${normalizedId}-`)||base.startsWith(`${normalizedId}_`)?base.slice(normalizedId.length):'';
      const languageSuffix=/^[-_](?:en|fr|nl|de|it|es|pt|sv|fi|da|no|is|hr|cs|sk|sl|el|et|lv|lt|mt|hu|pl|ro|bg)$/i.test(suffix);
      if(base===normalizedId || languageSuffix) {
        const relative=path.relative(ROOT,absolute).split(path.sep).join('/');
        const firstRecord=row.source_records.find(x=>x&&typeof x==='object')||{};
        const suffixLanguage=languageSuffix?suffix.slice(1):'';
        const language=suffixLanguage||row.inferred_language||languagesOf(firstRecord)[0]||'unspecified';
        row.source_records.push({id:row.id,title:row.title,local_copy_path:`source-library/${relative}`,language,local_copy_status:row.statuses.has('accepted_local_copy')?'accepted':'unreviewed'});
      }
    }
  }
  const rawRows=[...records.values()].sort((a,b)=>a.id.localeCompare(b.id));
  const urlToIds=new Map();
  for(const row of rawRows) for(const url of row.urls) { if(!urlToIds.has(url)) urlToIds.set(url,new Set()); urlToIds.get(url).add(row.id); }
  const aliasIdentity=new Map(), identityCollisionGroups=[];
  const normalizeTitle=value=>tidy(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  for(const row of rawRows) {
    const sample=row.source_records.find(x=>x && typeof x==='object' && (x.canonical_source_identity||x.canonical_identity||x.eli||x.celex||x.identity_key))||row.source_records[0]||{id:row.id,title:row.title};
    const urls=[...row.urls];
    const identity=inferRecordIdentity(iso,row.id,sample,urls);
    const collided=[...urls].filter(url=>(urlToIds.get(url)?.size||0)>1);
    let key=identity.key, resolved=identity.resolved, basis=identity.basis;
    if(collided.length && !identityText(sample?.official_url||sample?.url||urls[0]||'')) {
      const peers=rawRows.filter(other=>other.id!==row.id&&collided.some(url=>other.urls.has(url)));
      const sameTitle=peers.some(other=>normalizeTitle(other.title)===normalizeTitle(row.title)&&normalizeTitle(row.title));
      if(!sameTitle) { key=`${iso.toLowerCase()}:ambiguous:${slug(row.id)}:${digest(row.id).slice(0,12)}`; resolved=false; basis='official URL is shared by distinct catalogue IDs with different titles'; identityCollisionGroups.push({official_url:collided[0],entry_ids:[row.id,...peers.map(other=>other.id)].sort(),reason:'same official URL is assigned to multiple differently titled catalogue entries'}); }
    }
    aliasIdentity.set(row.id,{key,resolved,basis});
  }
  const languageGroups=new Map();
  for(const row of rawRows) {
    const match=row.id.match(/^(.*)[-_](en|fr|nl|de|it|es|pt|sv|fi|da|no|is|hr|cs|sk|sl|el|et|lv|lt|mt|hu|pl|ro|bg)$/i);
    if(!match) continue;
    const base=match[1].toLowerCase();
    row.inferred_language=match[2].toLowerCase();
    if(!languageGroups.has(base)) languageGroups.set(base,[]);
    languageGroups.get(base).push({row,language:match[2].toLowerCase()});
  }
  for(const [base,group] of languageGroups) {
    if(new Set(group.map(item=>item.language)).size<2) continue;
    const sharedIdentity=`${iso.toLowerCase()}:language-variant:${slug(base)}:${digest(base).slice(0,12)}`;
    for(const item of group) {
      aliasIdentity.set(item.row.id,{key:sharedIdentity,resolved:true,basis:'paired catalogue IDs with explicit language suffixes'});
      item.row.inferred_language=item.language;
    }
  }
  const entries=[];
  for(const row of rawRows) {
    const identity=aliasIdentity.get(row.id), sourceIdentityId=identity.key;
    const sourceRecords=row.source_records;
    const reps=[];
    for(const item of sourceRecords) reps.push(...representationSpecs(item,sourceIdentityId,country,row.inferred_language));
    if(!reps.length && row.urls.size) reps.push(...representationSpecs({url:[...row.urls][0],language:'unspecified'},sourceIdentityId,country,row.inferred_language));
    const repMap=new Map();
    for(const rep of reps) {
      const key=[rep.kind,rep.url||'',rep.path||'',rep.language,rep.edition].join('|');
      const prior=repMap.get(key);
      if(prior) prior.acceptance_status=[...new Set([...prior.acceptance_status,...rep.acceptance_status])].sort();
      else repMap.set(key,{...rep});
    }
    const allReps=[...repMap.values()];
    const specificUrls=new Set(allReps.filter(rep=>rep.language!=='unspecified'&&rep.url).map(rep=>rep.url));
    const uniqueReps=allReps.filter(rep=>!(rep.language==='unspecified'&&rep.url&&specificUrls.has(rep.url))).sort((a,b)=>a.representation_id.localeCompare(b.representation_id));
    const statuses=new Set(row.statuses);
    if(!statuses.size) statuses.add('candidate');
    for(const item of sourceRecords) for(const state of statusForRecord(item)) statuses.add(state);
    if(!statusOrder.some(state=>statuses.has(state))) statuses.add('candidate');
    const canonicalTitle=row.title || sourceRecords.find(x=>x.title)?.title || row.id;
    entries.push({
      id:row.id,
      title:canonicalTitle,
      source_type:row.source_type||'unspecified',
      official_urls:[...row.urls].sort(),
      source_identity_id:sourceIdentityId,
      identity_resolution_status:identity.resolved?'resolved':'unresolved',
      identity_resolution_basis:identity.basis,
      status_categories:statusOrder.filter(state=>statuses.has(state)),
      representation_ids:uniqueReps.map(rep=>rep.representation_id),
      representations:uniqueReps,
      catalogue_references:row.catalogue_references,
      acceptance_references:row.acceptance_references,
      status_record_ids:[...statusRecordLinks].filter(([,targetId])=>targetId===row.id).map(([statusId])=>statusId).sort()
    });
  }
  const unresolvedIdentityOwners = new Map();
  for(const entry of entries) if(entry.identity_resolution_status==='unresolved') {
    const prior=unresolvedIdentityOwners.get(entry.source_identity_id);
    if(prior) throw new Error(`Unresolved source identity was reused by ${country}:${prior} and ${country}:${entry.id}.`);
    unresolvedIdentityOwners.set(entry.source_identity_id,entry.id);
  }
  const groups=new Map();
  for(const entry of entries) { if(!groups.has(entry.source_identity_id)) groups.set(entry.source_identity_id,[]); groups.get(entry.source_identity_id).push(entry); }
  const unresolvedMatches=[...new Map(identityCollisionGroups.map(item=>[item.official_url,item])).values()];
  for(const [identityId,group] of groups) {
    if(group.length>1 && group.some(entry=>entry.identity_resolution_status==='unresolved')) unresolvedMatches.push({source_identity_id:identityId,entry_ids:group.map(entry=>entry.id),reason:'multiple catalogue rows share a provisional identity key'});
  }
  const identityLinks={};
  for(const entry of entries) identityLinks[entry.id]={source_identity_id:entry.source_identity_id,representation_ids:entry.representation_ids,identity_resolution_status:entry.identity_resolution_status};
  for(const [statusId,targetId] of statusRecordLinks) { const target=entries.find(entry=>entry.id===targetId); if(target) identityLinks[statusId]={source_identity_id:target.source_identity_id,representation_ids:target.representation_ids,identity_resolution_status:target.identity_resolution_status,linked_source_entry_id:targetId,status_record:true}; }
  const manifestPath=path.join(refDir,'candidate-manifest.json');
  let manifest;
  if(files.includes('candidate-manifest.json')) manifest=await parseJson(manifestPath);
  else {
    const rulesExists=files.includes('source-rules.json');
    manifest={schema_version:1,jurisdiction:iso,updated:new Date().toISOString().slice(0,10),inventory_scope:`Existing catalogued source records for ${country}; no acceptance or coverage decision is changed.`,source_rules_file:rulesExists?'references/source-rules.json':null,official_hosts:[],discovery_hosts:[],discovery_surfaces:[],entries:[]};
  }
  manifest.schema_version ??= 1;
  manifest.jurisdiction ??= iso;
  manifest.source_identity_inventory_schema_version=1;
  manifest.source_identity_inventory_file='references/source-identity-inventory.json';
  manifest.identity_entry_pointer='references/candidate-manifest.json#/entries';
  if(!files.includes('candidate-manifest.json')) manifest.identity_inventory_generated_manifest=true;
  manifest.entries=entries;
  const acceptanceOut={...acceptance,identity_links:identityLinks,identity_link_schema_version:1};
  // Keep legacy objects intact while giving every row with a known ID the same identity pointer.
  const manifestOut=enrichTree(manifest,identityLinks);
  const inventory={schema_version:1,jurisdiction:iso,jurisdiction_name:country,updated:'2026-10-29',identity_rule:'Existing catalogue IDs are preserved. Exact official URLs, CELEX and ELI identities are joined; language, edition, link and local-copy representations remain distinct. Potential cross-record matches are surfaced instead of silently merged.',source_count:entries.length,unique_identity_count:new Set(entries.map(x=>x.source_identity_id)).size,unresolved_identity_entry_count:entries.filter(x=>x.identity_resolution_status==='unresolved').length,unresolved_identity_matches:unresolvedMatches,source_list_file:files.includes('source-list.md')?'references/source-list.md':null,entries};
  const reportBlock=renderSourceListBlock(inventory);
  let sourceListOut=sourceListText;
  if(!sourceListText) sourceListOut=`# ${country[0].toUpperCase()+country.slice(1)} source list\n\nThis list is synchronized with the canonical machine-readable entries in [candidate-manifest.json](candidate-manifest.json). Acceptance remains recorded separately in [source-acceptance.json](source-acceptance.json).\n\n`;
  sourceListOut=replaceBlock(sourceListOut,reportBlock);
  return {country,refDir,files,manifestPath,manifestOut,acceptance,acceptanceOut,inventory,inventoryPath:path.join(refDir,'source-identity-inventory.json'),sourceListPath,sourceListOut};
}
function replaceBlock(text,block) {
  const start='<!-- source-identity-inventory:start -->',end='<!-- source-identity-inventory:end -->';
  const wrapped=`${start}\n${block.trimEnd()}\n${end}`;
  const a=text.indexOf(start),b=text.indexOf(end);
  if(a>=0&&b>=a) return text.slice(0,a)+wrapped+text.slice(b+end.length);
  return `${text.trimEnd()}\n\n${wrapped}\n`;
}
function renderSourceListBlock(inventory) {
  const rows=inventory.entries.map(entry=>`| \`${entry.id.replaceAll('|','\\|')}\` | \`${entry.source_identity_id}\` | ${entry.identity_resolution_status} | ${entry.representations.map(rep=>`${rep.kind}/${rep.language}/${rep.edition}${rep.kind==='local_artifact'&&rep.path?` (\`${rep.path.replaceAll('|','\\|')}\`)`:''}`).join('<br>')||'—'} | ${entry.status_categories.join(', ')||'candidate'} | ${entry.status_record_ids.join(', ')||'—'} |`);
  return [`## Source identity crosswalk`,``,`Canonical rows: **${inventory.entries.length}**; provisional unique IDs: **${inventory.unique_identity_count}**; unresolved entries: **${inventory.unresolved_identity_entry_count}**. This crosswalk preserves catalogue IDs, links external-reference and local-artifact representations to a source identity, and keeps acceptance status separate.`, ``,`| Existing entry ID | Canonical source identity | Resolution | Representations | Catalogued statuses | Status record IDs |`,`|---|---|---|---|---|---|`,...rows].join('\n');
}
async function main() {
  const write=process.argv.includes('--write');
  const check=process.argv.includes('--check');
  if(!write&&!check) throw new Error('Use --write to generate inventories, or --check to verify them.');
  const countryArg=process.argv.find(arg=>arg.startsWith('--country='));
  const selectedCountry=countryArg?countryArg.slice('--country='.length).toLowerCase():'';
  if(selectedCountry && !Object.hasOwn(ISO,selectedCountry)) throw new Error(`Unknown country: ${selectedCountry}`);
  const extraFileArg=process.argv.find(arg=>arg.startsWith('--extra-document-paths='));
  const extraDocumentMap=extraFileArg?await parseJson(path.resolve(extraFileArg.slice('--extra-document-paths='.length))):{};
  const countries=selectedCountry?[selectedCountry]:Object.keys(ISO);
  const packs=[];
  for(const country of countries) packs.push(await loadCountry(country,extraDocumentMap[country]||[]));
  const mismatches=[];
  for(const pack of packs) {
    const expectedFiles=[
      [pack.manifestPath,`${JSON.stringify(pack.manifestOut,null,2)}\n`],
      [pack.inventoryPath,`${JSON.stringify(pack.inventory,null,2)}\n`],
      ...(pack.files.includes('source-acceptance.json')?[[path.join(pack.refDir,'source-acceptance.json'),`${JSON.stringify(pack.acceptanceOut,null,2)}\n`]]:[]),
      [pack.sourceListPath,pack.sourceListOut]
    ];
    for(const [file,expected] of expectedFiles) {
      const current=await readFile(file,'utf8').catch(error=>error.code==='ENOENT'?null:Promise.reject(error));
      if(current!==expected) {
        mismatches.push(path.relative(ROOT,file));
        if(write) { await mkdir(path.dirname(file),{recursive:true}); await writeFile(file,expected,'utf8'); }
      }
    }
  }
  if(check&&mismatches.length) { process.stderr.write(`Identity inventory mismatch in ${mismatches.length} files:\n${mismatches.join('\n')}\n`); process.exitCode=1; }
  else process.stdout.write(JSON.stringify({mode:write?'write':'check',jurisdiction_count:packs.length,entry_count:packs.reduce((sum,p)=>sum+p.inventory.entries.length,0),identity_count:packs.reduce((sum,p)=>sum+p.inventory.unique_identity_count,0),unresolved_entry_count:packs.reduce((sum,p)=>sum+p.inventory.unresolved_identity_entry_count,0),mismatches:write?mismatches:[]},null,2)+'\n');
}
await main();
