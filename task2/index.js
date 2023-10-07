import images from './data.js';
import {galleryItemTemplate} from './templates.js';

const galleryContainer = document.querySelector('.gallery');

galleryContainer.innerHTML = '';

images.forEach((img) => {
    galleryContainer.innerHTML += galleryItemTemplate(img);
})



