import {
	GET_BOOK_LIST_FAILURE,
	GET_BOOK_LIST_REQUEST,
	GET_BOOK_LIST_SUCCESS,
} from "./constants";

const initialState = { bookList: [], totalBooks: 0 };

export const bookReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_BOOK_LIST_REQUEST:
			return { ...state, isImportingMaster: true };
		case GET_BOOK_LIST_SUCCESS:
			return {
				...state,
				bookList: payload.data.data,
				totalBooks: payload.data.pagination.totalElements,
			};
		case GET_BOOK_LIST_FAILURE:
			return { ...state, isImportingMaster: false };

		default:
			return state;
	}
};
