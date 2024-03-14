import { Field, Form, Formik } from "formik";
import css from './SearchBar.module.css'
import { GoSearch } from "react-icons/go";

const SearchBar = ({ onSearchHandler }) => {

  return (
    <div className={css.searchBar}>
        <Formik
        initialValues={{ query: "" }}
        onSubmit={(values) => {
          onSearchHandler(values.query);
        }}
        >
        <Form>
            <div className={css.formField}>
                <Field className={css.inputField} placeholder="Search images and photos" type="text" name="query" />
                <button className={css.searchIcon} type="submit"><GoSearch /></button>
            </div>
        </Form>
        </Formik>
    </div>
  )
}

export default SearchBar