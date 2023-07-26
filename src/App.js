import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksList } from "./actions";

import ReactPaginate from "react-paginate";
import BookModal from "./BookModal";

function App() {
	const dispatch = useDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [initialValues, setInitialValues] = useState({
		id: "",
		author: "",
		title: "",
		language: "",
		year: "",
		country: "",
		pages: "",
		link: "",
	});
	const [isAdding, setIsAdding] = useState(true);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const books = useSelector(state => {
		return state.books.bookList;
	});

	const totalBooks = useSelector(state => {
		return state.books.totalBooks;
	});

	useEffect(() => {
		dispatch(getBooksList());
	}, []);

	const filter = () => {
		dispatch(getBooksList(1, 10, searchText));
	};

	const page = data => {
		let currentPage = data.selected + 1;
		dispatch(getBooksList(currentPage, 10, searchText));
	};

	return (
		<>
			<div className="App">
				<div className="flex justify-between m-3">
					<h1 className="text-3xl text-center font-extrabold text-gray-900 mt-2 ">
						Books List
					</h1>
					<div className="flex justify-row">
						<input
							type="text"
							className="rounded h-10 "
							onChange={e => setSearchText(e.target.value)}
							placeholder="Search Book Title"
							value={searchText}
						/>
						<button
							className="block text-white font-bold bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ms-2"
							onClick={filter}
						>
							Search
						</button>
					</div>
					<button
						className="block text-white font-bold bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
						onClick={() => {
							setIsAdding(true);
							return openModal();
						}}
					>
						Add Book
					</button>
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
												<button
													onClick={() => {
														setIsAdding(false);
														setInitialValues(item);
														return openModal();
													}}
													className="block text-white font-bold bg-blue-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
													type="button"
												>
													Update Book Detail
												</button>
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
						pageCount={Math.ceil(totalBooks / 10)}
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
						activeClassName={"active z-0"}
					/>
				</div>
			</div>
			<BookModal
				isOpen={isModalOpen}
				closeModal={closeModal}
				initialValues={initialValues}
				isAdding={isAdding}
				searchText={searchText}
			/>
		</>
	);
}

export default App;
