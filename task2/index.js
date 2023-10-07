import images from './data.js';
import {galleryItemTemplate, modalTemplate} from './templates.js';

const hiddenImages = JSON.parse(localStorage.getItem('hiddenImages')) || [];

const galleryContainer = document.querySelector('.gallery');
const itemCollection = document.getElementsByClassName('gallery-item');
const restoreBtn = document.getElementById('restore-btn');

const updateAmount = () => {
    document.querySelector('.amount').innerHTML = itemCollection.length + ''
}

const addItems = () => {
    galleryContainer.innerHTML = '';
    images.forEach((img) => {
        if (hiddenImages.includes(img.id)) return;

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
    setInterval(setDate, 1000)
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

const saveDeleteId = (id) => {
    hiddenImages.push(id);
    localStorage.setItem('hiddenImages', JSON.stringify(hiddenImages));
}

const deleteItem = (e) => {
    const target = e.target;
    const parent = target.parentElement
    if (parent.classList.contains('delete')) {
        const id = parent.getAttribute('data-deleteId');

        const targetImage = Array.from(itemCollection).find(item => {
            return item.querySelector('.background').getAttribute('data-id') === id
        })

        if (targetImage) {
            targetImage.remove();
            saveDeleteId(id)
            updateAmount()
        }
    }
}

galleryContainer.addEventListener('click', deleteItem)

const restoreElements = () => {
    hiddenImages.length = 0
    localStorage.setItem('hiddenImages', JSON.stringify(hiddenImages))
    addItems()
}

restoreBtn.addEventListener('click', restoreElements)




