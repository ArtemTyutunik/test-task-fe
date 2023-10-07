import images from './data.js';
import {galleryItemTemplate, modalTemplate} from './templates.js';

const galleryContainer = document.querySelector('.gallery');

const updateAmount = () => {
    const itemCollection = document.querySelectorAll('.gallery-item');
    document.querySelector('.amount').innerHTML = itemCollection.length + ''
}

const addItems = () => {
    galleryContainer.innerHTML = '';
    images.forEach((img) => {
        galleryContainer.innerHTML += galleryItemTemplate(img);
    })
    updateAmount();
}

addItems()

const setDate = () => {
    const dateControlElement = document.querySelector('.date');
    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    dateControlElement.innerHTML = `${day}.${month}.${year} ${hours}:${minutes}`;
}


(() => {
    setDate()
    setInterval(setDate, 60_000)
})()


const openModal = (e) => {
    const target = e.target;
    if (target.getAttribute('data-id')) {
        const id = target.dataset.id;

        if (id) {
            const image = images.find(image => image.id === id)
            if (image) {
                const modal = document.createElement('div');
                modal.innerHTML = modalTemplate(image.src);

                document.body.appendChild(modal)
                const closeModalButton = modal.querySelector('.close');

                closeModalButton.addEventListener('click', () => {
                    modal.remove()
                })
            }
        }
    }
}

galleryContainer.addEventListener('click', openModal)



