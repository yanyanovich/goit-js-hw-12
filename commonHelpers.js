import{a as p,i as s,S as h}from"./assets/vendor-38cc1e54.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(r){if(r.ep)return;r.ep=!0;const t=n(r);fetch(r.href,t)}})();const b="44768400-50ed818a42c4b3c7dfabdf0f1",L="https://pixabay.com/api/";async function f(e,o=1){const n=await p.get(L,{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:15}});if(n.status!==200)throw new Error(n.status);return n.data.hits}function m(e,o=!0){const n=document.querySelector(".gallery");if(o&&(n.innerHTML=""),e.length===0){s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}const a=e.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}" class="gallery-item">
          <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b> ${t.likes}</p>
            <p class="info-item"><b>Views</b> ${t.views}</p>
            <p class="info-item"><b>Comments</b> ${t.comments}</p>
            <p class="info-item"><b>Downloads</b> ${t.downloads}</p>
          </div>
        </a>
    </li>
  `).join("");n.insertAdjacentHTML("beforeend",a),new h(".gallery a",{captionsData:"alt"}).refresh(),o||w()}function w(){const{height:e}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}function g(){document.querySelector(".loader").classList.add("visible")}function y(){document.querySelector(".loader").classList.remove("visible")}function S(){const e=document.querySelector("#search-input");e.value=""}function c(e){const o=document.querySelector("#load-more-btn");e?o.classList.remove("hidden"):o.classList.add("hidden")}let i=1,u="";const d={form:document.querySelector(".form"),input:document.querySelector(".search-input"),loadMoreButton:document.querySelector("#load-more-btn")};d.form.addEventListener("submit",v);d.loadMoreButton.addEventListener("click",q);async function v(e){e.preventDefault();const o=d.input.value.trim();if(o===""){s.warning({title:"Warning",message:"Please enter a search term!"});return}u=o,i=1,g(),c(!1);try{const n=await f(u,i);m(n,!0),c(n.length>0),S()}catch{s.error({title:"Error",message:"Something went wrong. Please try again!"})}finally{y()}}async function q(){i+=1,g();try{const e=await f(u,i);m(e,!1),e.length===0&&(c(!1),s.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch{s.error({title:"Error",message:"Something went wrong. Please try again!"})}finally{y()}}
//# sourceMappingURL=commonHelpers.js.map