import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{S as L,i as o}from"./assets/vendor-5ObWk2rO.js";document.addEventListener("DOMContentLoaded",()=>{const a=document.querySelector(".container");if(!a){console.error("Container element not found!");return}a.insertAdjacentHTML("beforeend",`
    <form id="search-form" class="form">
      <input type="text" id="search-input" placeholder="Search for images..." />
      <button type="submit">Search</button>
    </form>
    <div id="gallery"></div>
    <div id="loader" class="loader hidden"></div>
  `);const s=document.getElementById("search-form"),c=document.getElementById("search-input"),t=document.getElementById("gallery"),l="47476040-47c09894141d90fd499f71b0b",i=document.getElementById("loader"),d=new L("#gallery a",{captionsData:"alt",captionsDelay:250});s.addEventListener("submit",n=>{n.preventDefault();const r=c.value.trim();if(!r){o.warning({title:"Warning",message:"Please enter a search query!"});return}t.innerHTML="",h(),fetch(`https://pixabay.com/api/?key=${l}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true`).then(e=>{if(!e.ok)throw new Error;return e.json()}).then(e=>{if(e.hits.length===0){o.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),t.innerHTML="";return}m(e.hits)}).catch(e=>{o.error({title:"Error",message:"Something went wrong. Please try again later!"}),console.log(e)}).finally(()=>{p()})});function m(n){const r=n.map(({webformatURL:e,largeImageURL:u,tags:g,likes:f,views:y,comments:b,downloads:v})=>`
     <div class="photo-card">
    <a href="${u}" target="blank" rel="noopener noreferrer">
        <img src="${e}" alt="${g}" loading="lazy"></img>
    </a>
    <div class="info">
        <p><b>Likes:</b>${f}</p>
        <p><b>Views:</b>${y}</p>
        <p><b>Comments:</b>${b}</p>
        <p><b>Downloads:</b>${v}</p>
    </div>
    
    
   </div>`).join("");t.innerHTML=r,d.refresh()}function h(){i.classList.remove("hidden")}function p(){i.classList.add("hidden")}});
//# sourceMappingURL=page-2.js.map
