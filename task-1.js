/* empty css                      */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();//! ======================================== Асинхронність  ========================================
const i=document.querySelector(".receive-data-btn"),s=document.querySelector(".button-box"),d=c=>{setTimeout(()=>{i.textContent="Nice! Data is downloaded",i.classList.add("disabled"),document.querySelector(".loading-bar").remove()},5e3),s.insertAdjacentHTML("beforeend",`
        <ul class = 'loading-bar'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        `)};i.addEventListener("click",d);
//# sourceMappingURL=task-1.js.map
