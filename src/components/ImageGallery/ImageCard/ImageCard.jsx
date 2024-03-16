import css from './ImageCard.module.css'


const ImageCard = ({ item: { urls, alt_description, description }, openModal }) => {
    return (
        <div className={css.imgContainer}>
            <img src={urls.small} alt={alt_description} onClick={() => openModal(urls.regular, alt_description, description)} 
                title={description} className={css.img}/>
        </div>
    )
}

export default ImageCard