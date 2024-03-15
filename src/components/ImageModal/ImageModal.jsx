import Modal from 'react-modal';
import css from './ImageModal.module.css'

Modal.setAppElement('#root');

const ImageModal = ({ imgItem, isOpenModal, closeModal }) => {
    const imgUrl = imgItem.urls ? imgItem.urls.regular : '';
    const imgDescr = imgItem.description ?? '';
    const imgAlt = imgItem.alt_description ?? '';

    return (
        <Modal
            isOpen={isOpenModal}
            onRequestClose={closeModal}
            className={css.Modal}
            overlayClassName={css.Overlay}
        >
            <div className={css.modalContent}>
                <div className={css.header}>
                    <span className={css.descr}>{imgDescr}</span>
                    <button  className={css.btn} onClick={closeModal}>X</button>
                </div>
                <img src={imgUrl} alt={imgAlt} className={css.img}/>
            </div>
        </Modal>
    );

}

export default ImageModal