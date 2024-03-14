import { forwardRef } from "react";
import ImageCard from './ImageCard/ImageCard'
import css from './ImageGallery.module.css'
// TODO remove nano
import { nanoid } from 'nanoid'

//eslint-disable-next-line react/display-name
const ImageGallery = forwardRef(({ openModal, collection }, ref) => {
  return (
    <ul className={css.list} ref={ref}>
      {
        collection.map((item) => (
          // TODO replace to item.id
          // <li key={item.id}>
          <li key={nanoid()}>
            <ImageCard openModal={openModal} item={item} />
          </li>
        ))
      }
    </ul>
  )
});

export default ImageGallery
