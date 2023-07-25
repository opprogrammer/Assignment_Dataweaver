import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBooksList } from "./actions";
import { debounce } from "lodash-es";

function App() {
  const dispatch = useDispatch();

  const books = useSelector((state) => {
    return state.books.bookList;
  });

  useEffect(() => {
    dispatch(getBooksList());
  }, []);

  const filter = debounce((event) => {
    dispatch(getBooksList(1, 10, event.target.value));
  }, 500);

  return (
    <div className="App">
      <input
        type="text"
        className="form-control"
        onChange={filter}
        placeholder="search"
      />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Book Title
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Pages
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.author}</td>
                  <td className="px-6 py-4">{item.title}</td>
                  <td className="px-6 py-4">{item.language}</td>
                  <td className="px-6 py-4">{item.pages}</td>
                  <td className="px-6 py-4">{item.year}</td>
                  <td className="px-6 py-4">{item.country}</td>
                  <td className="px-6 py-4">{item.link}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
