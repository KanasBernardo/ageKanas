const y=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}};y();let o=[],a=[];const d=document.querySelector("#eventName"),l=document.querySelector("#eventDate"),p=document.querySelector("#bAdd"),g=document.querySelector("#eventsContainer"),S=h();try{a=JSON.parse(S)}catch{a=[]}o=a?[...a]:[];u();document.querySelector("form").addEventListener("submit",t=>{t.preventDefault(),f()});p.querySelector("form").addEventListener("click",t=>{t.preventDefault(),f()});function f(){if(d.value==""||l.value==""||m(l.value)<0)return;const t={id:(Math.random()*100).toString(36).slice(3),name:d.value,date:l.value};o.unshift(t),v(JSON.stringify(o)),d.value="",u()}function m(t){const n=new Date(t),s=new Date,i=n.getTime()-s.getTime();return Math.ceil(i/(1e3*3600*24))}function u(){const t=o.map(n=>`
            <div class="event">
                <div class="days">
                    <span class="days-number">${m(n.date)}</span>
                    <span class="days-text">dias</span>
                </div>

                <div class="event-name">${n.name}</div>
                <div class="event-date">${n.date}</div>
                <div class="actions">
                    <button class="bDelete" data-id="${n.id}">Eliminar</button>
                </div>
            </div>
        `);g.innerHTML=t.join(""),document.querySelectorAll(".bDelete").forEach(n=>{n.addEventListener("click",s=>{const i=n.getAttribute("data-id");o=o.filter(e=>e.id!=i),v(JSON.stringify(o)),u()})})}function v(t){localStorage.setItem("items",t)}function h(){return localStorage.getItem("items")}
