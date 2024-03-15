
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
// TODO remove test functions
import { requestImagesByQuery, requestImageById, requestImagesByQueryPixabu, requestImagesByQueryTest, requestImageByIdTest } from "../../services/api";
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
  const imgId = useRef(null);

  useEffect(() => {
    if (!query) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);
        setShowMoreBtn(false);
  
        // TODO remove test func
        const data = await requestImagesByQuery({ page, query });
        // const data = await requestImagesByQueryPixabu({ page, query });
        // const data = await requestImagesByQueryTest({ page, query });
        if (data.results) {
        // if (data.hits) {
          if (page == 1) {
            setImgCollection(data.results);
            // setImgCollection(data.hits);
          } else {
            setImgCollection(prev => [...prev, ...data.results]);
            // setImgCollection(prev => [...prev, ...data.hits]);
          }
  
          if (data.total_pages && data.total_pages > page) {
          // if (data.totalHits && data.totalHits > page * 12) {
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
    if (!searchQuery) {
      toast.success('The search field must be filled in!', { iconTheme: { primary: '#713200', secondary: '#FFFAEE', }, });
    } else {
      setQuery(searchQuery);
      setPage(1);
    }
  }

  const onLoadMoreHandler = () => {
    setPage(page + 1);
  }

  useEffect(() => {
    if (!ulRef.current.children[0]) return;
    const elHeight = ulRef.current.children[0].getBoundingClientRect().height;
    window.scrollBy({ left:0, top: elHeight * 3 + 45, behavior: 'smooth'});
  }, [imgCollection]);


  useEffect(() => {
    if (!isOpenModal) return;

    async function fetchDataByQuery() {
      try {
        setIsError(false);
  
        // TODO remove test func
        const data = await requestImageById(imgId.current);
        // const data = await requestImageByIdPixabu(imgId.current);
        // const data = await requestImageByIdTest(imgId.current);
        if (data) {
          setImgItem(data);
        }
    
      } catch (err) {
        console.log(err);
        setIsError(true);
        toast.error(`Network error: ${err}`);
      }
    }
  
    fetchDataByQuery();

  }, [isOpenModal]);

  const openModal = (id) => {
    imgId.current = id;
    setIsOpenModal(true);
  }

  const closeModal = () => {
    imgId.current = null;
    setImgItem({});
    setIsOpenModal(false);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSearchHandler={onSearchHandler} />
      {isError && <ErrorMessage />}
      <ImageGallery ref={ulRef} openModal={openModal} collection={imgCollection} />
      {isLoading && <Loader />}
      {showMoreBtn && <LoadMoreBtn onLoadMoreHandler={onLoadMoreHandler} />}
      <ImageModal imgItem={imgItem} isOpenModal={isOpenModal} closeModal={closeModal} />
    </>
  )
}

export default App
