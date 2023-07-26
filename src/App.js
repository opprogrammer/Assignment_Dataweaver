import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBooksList } from "./actions";
import { debounce } from "lodash-es";

import ReactPaginate from "react-paginate";
import EditModal from "./EditModal";

function App() {
  const dispatch = useDispatch();

  const books = useSelector((state) => {
    return state.books.bookList;
  });

  // const items = useSelector(() => {
  //   return totalBooks;
  // });

  // let pageCount=Math.ceil(items / 10);

  useEffect(() => {
    dispatch(getBooksList());
  }, []);

  const filter = debounce((event) => {
    dispatch(getBooksList(1, 10, event.target.value));
  }, 500);

  const page = (data) => {
    let currentPage = data.selected + 1;
    dispatch(getBooksList(currentPage, 10));
  };

  const [post, setPost] = useState({
    id: "",
    author: "",
    title: "",
    language: "",
    pages: "",
    year: "",
    country: "",
    link: "",
  });

  const habdleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://68.178.162.203:8080/application-test-v1.1/books", { post })
      .then((response) => console.log(response))
      .then(alert("Data Added"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <h1 className="text-3xl text-center font-extrabold text-gray-900 mt-2 ">
        Book Details
      </h1>
      <div className="flex justify-center item-center">
        <input
          type="text"
          className="mt-12 rounded h-10 "
          onChange={filter}
          placeholder="Search Book Title"
        />

        <div className="flex justify-center m-5 ">
          <button
            id="defaultModalButton"
            data-modal-toggle="defaultModal"
            className="block text-white font-bold bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            type="button"
          >
            Add Book Detail
          </button>
        </div>

        <div
          id="defaultModal"
          tabIndex={-1}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow  sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 d">
                <h3 className="text-lg font-semibold text-gray-900 ">
                  Add Book
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="id"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Id
                    </label>
                    <input
                      type="text"
                      onChange={habdleInput}
                      name="id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Type Id"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="author"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      onChange={habdleInput}
                      name="author"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Type author"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Book Title
                    </label>
                    <input
                      type="text"
                      onChange={habdleInput}
                      name="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type book title"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="language"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Language
                    </label>
                    <input
                      type="text"
                      onChange={habdleInput}
                      name="language"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Type language"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pages"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Pages
                    </label>
                    <input
                      type="number"
                      onChange={habdleInput}
                      name="pages"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Type pages"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="year"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Year
                    </label>
                    <input
                      type="number"
                      onChange={habdleInput}
                      name="year"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type year"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      country
                    </label>
                    <input
                      type="text"
                      onChange={habdleInput}
                      name="country"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Type country"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="link"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Link
                    </label>
                    <input
                      type="text"
                      onChange={habdleInput}
                      name="link"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type link"
                      required=""
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-500 inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative overflow-x-auto mb-3 ">
          <table className=" mb-2 w-auto text-lg text-center border shadow-md sm:rounded-lg ">
            <thead className="text-md text-gray-700  bg-gray-200 ">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Id
                </th>
                <th scope="col" className="px-4 py-3">
                  Author
                </th>
                <th scope="col" className="px-4 py-3">
                  Book Title
                </th>
                <th scope="col" className="px-4 py-3">
                  Language
                </th>
                <th scope="col" className="px-4 py-3">
                  Pages
                </th>
                <th scope="col" className="px-4 py-3">
                  Year
                </th>
                <th scope="col" className="px-4 py-3">
                  Country
                </th>
                <th scope="col" className="px-4 py-3">
                  Link
                </th>
                <th scope="col" className="px-4 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800"
                  >
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.author}</td>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">{item.language}</td>
                    <td className="px-4 py-2">{item.pages}</td>
                    <td className="px-4 py-2">{item.year}</td>
                    <td className="px-4 py-2">{item.country}</td>
                    <td className="px-4 py-2">{item.link}</td>
                    <td className="px-4 py-2">
                    
                    <div className="flex justify-center m-5 ">
          <button
            id="defaultModalButton"
            data-modal-toggle="defaultModal"
            className="block text-white font-bold bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            type="button"
          >
            Update Book Detail
          </button>
        </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      

      <div className="mb-5 text-md">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={27}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={page}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
      <EditModal />
    </div>
  );
}


export default App;
