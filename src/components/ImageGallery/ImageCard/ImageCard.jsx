import css from './ImageCard.module.css'


// TODO uncomment this remove pixabu
const ImageCard = ({ item: { id, urls, alt_description, description }, openModal }) => {

    return (
        <div className={css.imgContainer} onClick={() => openModal(id)}>
            <img src={urls.small} alt={alt_description} title={description} className={css.img}/>
        </div>
    )
}

// const ImageCard = ({ item: { id, webformatURL, tags }, openModal }) => {

//     return (
//         <div className={css.imgContainer} onClick={() => openModal(id)}>
//             <img src={webformatURL} alt={tags} className={css.img}/>
//         </div>
//     )
// }

export default ImageCard