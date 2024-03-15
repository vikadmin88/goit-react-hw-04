
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { requestImagesByQuery } from "../../services/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import './App.module.css'

const App = () => {
  const [imgCollection, setImgCollection] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const ulRef = useRef(null);
  const [imgItem, setImgItem] = useState({});

  useEffect(() => {
    if (!query) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);
        setShowMoreBtn(false);
  
        const data = await requestImagesByQuery({ page, query, perPage: 12 });
        if (data.results) {
          if (page == 1) {
            setImgCollection(data.results);
          } else {
            setImgCollection(prev => [...prev, ...data.results]);
          }
  
          if (data.total_pages && data.total_pages > page) {
            setShowMoreBtn(true);
          } else {
            toast.success('There are no more images.');
          }
        } else {
          toast.success('No images found!');
        }
    
      } catch (err) {
        console.log(err);
        setImgCollection([]);
        setIsError(true);
        toast.error(`Network error: ${err}`);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchDataByQuery();
  }, [query, page]);


  const onSearchHandler = (searchQuery) => {
    if (searchQuery) {
      setQuery(searchQuery);
      setPage(1);
    } else {
      toast.success('The search field must be filled in!', { iconTheme: { primary: '#713200', secondary: '#FFFAEE', }, });
    }
  }

  const onLoadMoreHandler = () => {
    if (query) {
      setPage(page + 1);
    } else {
      toast.success('The search field must be filled in!', { iconTheme: { primary: '#713200', secondary: '#FFFAEE', }, });
    }
  }

  useEffect(() => {
    if (!ulRef.current.children[0]) return;
    const elHeight = ulRef.current.children[0].getBoundingClientRect().height;
    window.scrollBy({ left:0, top: elHeight * 3 + 45, behavior: 'smooth'});
  }, [imgCollection]);


  const openModal = (imgUrl, imgAlt, imgDescr) => {
    setImgItem({imgUrl, imgAlt, imgDescr});
    setIsOpenModal(true);
  }

  const closeModal = () => {
    setImgItem({});
    setIsOpenModal(false);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSearchHandler={onSearchHandler} />
      {isError && <ErrorMessage />}
      <ImageGallery ref={ulRef} openModal={openModal} collection={imgCollection} />
      {!isError && isLoading && <Loader />}
      {!isLoading && showMoreBtn && <LoadMoreBtn onLoadMoreHandler={onLoadMoreHandler} />}
      <ImageModal imgItem={imgItem} isOpenModal={isOpenModal} closeModal={closeModal} />
    </>
  )
}

export default App
