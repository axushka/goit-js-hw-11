import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";




document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.container');

  if (!container) {
    console.error("Container element not found!");
    return;
  }

  const createMarkup = `
    <form id="search-form" class="form">
      <input type="text" id="search-input" placeholder="Search for images..." />
      <button type="submit">Search</button>
    </form>
    <div id="gallery"></div>
    <div id="loader" class="loader hidden"></div>
  `;

  container.insertAdjacentHTML("beforeend", createMarkup);


const form = document.getElementById(`search-form`);
const searchInput = document.getElementById(`search-input`);
const gallery = document.getElementById(`gallery`);
const PIXABAY_API_KEY = `47476040-47c09894141d90fd499f71b0b`;
const loader = document.getElementById('loader');
const lightbox = new SimpleLightbox('#gallery a', {
    captionsData: `alt`,
    captionsDelay: 250,
});

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();

    if(!query) {
        iziToast.warning({
            title: `Warning`,
            message: 'Please enter a search query!'
        })
return;
    }
    gallery.innerHTML = ``;
    showLoader(); 
fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`)
.then(response => {
    if(!response.ok) {
        throw new Error();
    }
    return response.json()
})
    
.then(data => {
    if(data.hits.length === 0) {
        iziToast.error({
            title: `Error`,
            message: `Sorry, there are no images matching your search query. Please try again!`
        });
        gallery.innerHTML = ``;
return;
    }
    renderGallery(data.hits);
})
.catch(error => {
    iziToast.error({
        title: `Error`,
        message: `Something went wrong. Please try again later!`
    });
    console.log(error);
    
})
.finally(() => {
    hideLoader();
})

})

function renderGallery(images) {
    const markup = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
     <div class="photo-card">
    <a href="${largeImageURL}" target="blank" rel="noopener noreferrer">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"></img>
    </a>
    <div class="info">
        <p><b>Likes:</b>${likes}</p>
        <p><b>Views:</b>${views}</p>
        <p><b>Comments:</b>${comments}</p>
        <p><b>Downloads:</b>${downloads}</p>
    </div>
    
    
   </div>`
      ).join(``);
    gallery.innerHTML = markup;
    lightbox.refresh();
}


function showLoader() {
    loader.classList.remove('hidden');
    }
    function hideLoader() {
        loader.classList.add('hidden');

    }
});