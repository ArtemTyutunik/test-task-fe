

export const galleryItemTemplate  = (image) => {
    return `<div class="gallery-item">
        <div class="background" style="background-image: url('${image.src}')"></div>
    </div>`
}
