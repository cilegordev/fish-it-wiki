// Membangun header + sidebar yang sama di semua halaman
(function(){
 if(typeof SOON==="undefined"){document.body.insertAdjacentHTML("afterbegin","<p style=\"padding:20px;color:#e4572e;font:16px sans-serif\">Gagal memuat data.js. Pastikan file data.js ada di folder yang sama dengan halaman ini (nama file harus persis huruf kecil).</p>");return}
 const page=document.body.dataset.page||"home";
 const links=[["islands.html","Islands","islands"]]
  .concat(SOON.map(s=>["coming-soon.html?p="+s.id,s.name,"soon-"+s.id]))
  .concat([["enchants.html","Enchants","enchants"]]);
 const side=links.map(l=>`<a href="${l[0]}" class="${l[2]===page?"on":""}">${l[1]}${l[2].startsWith("soon")?"<small>segera</small>":""}</a>`).join("");
 document.body.insertAdjacentHTML("afterbegin",`<header><button id="navToggle" class="hamburger" aria-label="Buka/tutup menu" aria-expanded="true"><span></span><span></span><span></span></button><a class="brand" href="index.html">Fish It <span>Wiki</span></a><a class="roblox-link" href="https://www.roblox.com/games/121864768012064/Fish-It" target="_blank" rel="noopener" aria-label="Play Fish It Now" title="Play Fish It Now"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="11" rx="4"></rect><line x1="7" y1="10.5" x2="7" y2="14.5"></line><line x1="5" y1="12.5" x2="9" y2="12.5"></line><circle cx="15.5" cy="10.5" r="1"></circle><circle cx="18" cy="13" r="1"></circle></svg><span>Play</span></a></header>
 <div class="layout"><nav class="side" aria-label="Navigasi">${side}</nav><div class="backdrop"></div><main id="content"></main></div>
 <footer><span id="clock"></span></footer>`);
 document.getElementById("content").append(...document.querySelectorAll("template#c")[0].content.childNodes);
 document.addEventListener("dragstart",e=>{if(e.target.tagName==="IMG")e.preventDefault()});
 const clockEl=document.getElementById("clock"),p2=n=>String(n).padStart(2,"0");
 const tick=()=>{const d=new Date();clockEl.textContent=p2(d.getDate())+"/"+p2(d.getMonth()+1)+"/"+d.getFullYear()+" - "+p2(d.getHours())+":"+p2(d.getMinutes())+":"+p2(d.getSeconds())};
 tick();setInterval(tick,1000);
 const setHeaderH=()=>document.documentElement.style.setProperty("--header-h",document.querySelector("header").offsetHeight+"px");
 setHeaderH();window.addEventListener("resize",setHeaderH);
 const nav=document.querySelector("nav.side"),layoutEl=document.querySelector(".layout"),btn=document.getElementById("navToggle"),backdrop=document.querySelector(".backdrop");
 const setOpen=open=>{nav.classList.toggle("hidden",!open);layoutEl.classList.toggle("collapsed",!open);btn.setAttribute("aria-expanded",open)};
 let open;try{open=window.innerWidth<=760?false:localStorage.getItem("navOpen")!=="0"}catch(e){open=window.innerWidth>760}
 setOpen(open);
 const toggle=()=>{open=!open;setOpen(open);try{localStorage.setItem("navOpen",open?"1":"0")}catch(e){}};
 btn.addEventListener("click",toggle);
 backdrop.addEventListener("click",toggle);
})();
