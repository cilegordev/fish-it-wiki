// Dipakai bersama oleh halaman Rods dan Baits (dimuat setelah data.js dan site.js)
const toArr=x=>(Array.isArray(x)?x:(x==null||x===""?[]:[x])).filter(v=>v!=null&&v!=="");
const fmtPrice=p=>{
 if(p===undefined||p===null||p==="")return "";
 const s=String(p).trim();
 if(/^0+$/.test(s))return "Free";
 if(/^[\d.,]+$/.test(s))return Number(s.replace(/,/g,"")).toLocaleString("en-US")+" Coins";
 if(/^[\d.,]+\s*[KMBTkmbt]$/.test(s))return s.replace(/\s+/g,"").toUpperCase()+" Coins";
 return s;
};
// Stat ditulis satu teks, dipisah otomatis jadi nama + nilai:
//  "Shiny Chance: x1.1"                     -> titik dua memaksa pemisahan
//  "Mutation Chance 0.15% - 0.30%"          -> nilai dimulai dari angka pertama
//  "Mutation Chance from Withering Core x2" -> nilai "x2"
//  "?"                                      -> tanpa angka: pakai nama default
const splitStat=(v,def)=>{
 if(v&&typeof v==="object")return {label:v.name||v.label||def,value:v.value??""};
 const s=String(v).trim(),i=s.indexOf(":");
 if(i>0)return {label:s.slice(0,i).trim(),value:s.slice(i+1).trim()};
 const m=s.match(/\s(?=[x×]?\d)/);
 if(m&&m.index>0)return {label:s.slice(0,m.index).trim(),value:s.slice(m.index+1).trim()};
 return {label:def,value:s};
};
const stat=(label,val,cls="")=>val?`<div class="rstat ${cls}"><span${label==="Unique Stat"?' class="nw"':""}>${label}</span><b>${val}</b></div>`:"";
const tocHTML=list=>list.map(r=>`<a class="pill" href="#${slug(r.name)}">${r.name}</a>`).join("");
// r: data rod/bait | o.imgDir: folder gambar | o.noun: "rod"/"bait" | o.stats: html baris stat
const cardHTML=(r,o)=>{
 const quest=toArr(r.quest),obtain=toArr(r.obtain);
 const parts=(Array.isArray(r.quests)?r.quests:[]).map(p=>typeof p==="string"?{name:"",steps:[p]}:{name:p.name??p.questName??p.title??"",steps:toArr(p.steps??p.quest??p.list)}).filter(p=>p.name||p.steps.length);
 const hq=quest.length>0||parts.length>0;
 const price=fmtPrice(r.price);
 const isl=r.island&&ISLANDS.find(i=>i.id===r.island||i.name.toLowerCase()===String(r.island).toLowerCase());
 const at=r.island?` at ${isl?isl.name:r.island}`:"";
 const li=t=>`<li>${t}</li>`,lines=[];
 if(hq&&!price&&r.island)lines.push(li(`Location: ${r.island}`));
 if(quest.length&&r.questName)lines.push(li(`Quest: ${r.questName}`));
 quest.forEach(q=>lines.push(li(q)));
 parts.forEach(p=>{if(p.name)lines.push(`<li class="qh">Quest: ${p.name}</li>`);p.steps.forEach(q=>lines.push(li(q)))});
 obtain.forEach(t=>lines.push(li(t)));
 if(price)lines.push(li(hq||obtain.length?`Price: ${price}${at}`:price==="Free"?`Free, you start with this ${o.noun}.`:`Buy ${price}${at}.`));
 if(!lines.length)lines.push(li(r.island?`Available at ${r.island}.`:"Belum diisi."));
 return `<section class="rodrow ${slug((r.rarity||"").split(" ")[0])}" id="${slug(r.name)}">
  ${img(o.imgDir+slug(r.name)+".png",r.name,"rodimg")}
  <div class="rodinfo">
   <div class="rodhead"><h2>${r.name}</h2>${r.rarity?`<span class="rodtag">${r.rarity}</span>`:""}${hq?`<span class="rodtag quest">QUEST</span>`:""}</div>
   ${r.desc?`<p>${r.desc}</p>`:""}
   <div class="rstats">${o.stats}</div>
   <p><b>How to get : </b></p>
   <ul>${lines.join("")}</ul>
  </div></section>`;
};
