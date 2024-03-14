import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMoreHandler }) => {
  return (
    <button type="button" className={css.button} onClick={() => onLoadMoreHandler()}>Load more</button>
  )
}

export default LoadMoreBtn