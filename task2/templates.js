

export const galleryItemTemplate  = (image) => {
    return `<div class="gallery-item">
        <div class="background" 
        style="background-image: url('${image.src}')" 
        data-id="${image.id}"></div>
        <div class="delete" data-deleteId="${image.id}">
            <img src="images/delete.svg" alt="delete"/>
        </div>
    </div>`
}

export const modalTemplate = (imageSrc) => {
    return `<div class="modal">
        <div class="content">
            <div class="image">
                <img src="${imageSrc}" alt=""/>
            </div>
            <div class="close">
                <img src="./images/close.svg" alt="close"/>
            </div>
        </div>
    </div>`
}
