import { forwardRef } from "react";
import ImageCard from './ImageCard/ImageCard'
import css from './ImageGallery.module.css'

//eslint-disable-next-line react/display-name
const ImageGallery = forwardRef(({ openModal, collection }, ref) => {
  return (
    <ul className={css.list} ref={ref}>
      {
        collection.map((item) => (
          <li key={item.id}>
            <ImageCard openModal={openModal} item={item} />
          </li>
        ))
      }
    </ul>
  )
});

export default ImageGallery
