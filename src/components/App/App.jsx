
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
// TODO remove test functions
import { requestImagesByQuery, requestImagesByQueryTest, requestImageByIdTest } from "../../services/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import './App.module.css'

const App = () => {
  const [imgCollection, setImgCollection] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const ulRef = useRef(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);
        setShowMoreBtn(false);
  
        // TODO remove test func
        // const data = await requestImagesByQuery({ page, query });
        const data = await requestImagesByQueryTest({ page, query });
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

  useEffect(() => {
    if (!ulRef.current.children[0] || page === 1) return;
    const elHeight = ulRef.current.children[0].getBoundingClientRect().height;
    window.scrollBy({ left:0, top: elHeight * 3 + 45, behavior: 'smooth'});
  }, [imgCollection, page]);

  const onSearchHandler = (query) => {
    if (!query) {
      toast.success('The search field must be filled in!', { iconTheme: { primary: '#713200', secondary: '#FFFAEE', }, });
    } else {
      setQuery(query);
      setPage(1);
    }
  }

  const onLoadMoreHandler = () => {
    setPage(page + 1);
  }

  const openModal = (id) => {
    console.log("doOpenModal: id ", id);
  };


  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSearchHandler={onSearchHandler} />
      {isError && <ErrorMessage />}
      <ImageGallery ref={ulRef} openModal={openModal} collection={imgCollection} />
      {isLoading && <Loader />}
      {showMoreBtn && <LoadMoreBtn onLoadMoreHandler={onLoadMoreHandler} />}
    </>
  )
}

export default App
