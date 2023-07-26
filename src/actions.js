import axios from "axios";
import {
  GET_BOOK_LIST_FAILURE,
  GET_BOOK_LIST_REQUEST,
  GET_BOOK_LIST_SUCCESS,
} from "./constants";

export const getBooksList =
  (page = 1, pageSize = 10) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_BOOK_LIST_REQUEST });

      const { data } = await axios.get(
        `http://68.178.162.203:8080/application-test-v1.1/books?page=${page}&pageSize=${pageSize}`
      );

      dispatch({
        type: GET_BOOK_LIST_SUCCESS,
        payload: {
          success: "success",
          data,
        },
      });
    } catch (error) {
      dispatch({ type: GET_BOOK_LIST_FAILURE, payload: error });
    }
  };
