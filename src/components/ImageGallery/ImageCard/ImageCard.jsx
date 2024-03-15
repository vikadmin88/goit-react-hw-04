import css from './ImageCard.module.css'


const ImageCard = ({ item: { id, urls, alt_description, description }, openModal }) => {
    return (
        <div className={css.imgContainer} onClick={() => openModal(id)}>
            <img src={urls.small} alt={alt_description} title={description} className={css.img}/>
        </div>
    )
}

export default ImageCard