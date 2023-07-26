import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { getBooksList } from "./actions";

Modal.setAppElement("#root"); // Set the app root element for accessibility

const BookModal = ({
	isOpen,
	closeModal,
	initialValues = {},
	isAdding,
	searchText,
}) => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState(initialValues);

	useEffect(() => {
		setFormData(initialValues);
	}, [initialValues]);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (isAdding) {
			axios
				.post(
					"http://68.178.162.203:8080/application-test-v1.1/books",
					formData
				)
				.then(response => {
					closeModal();
					dispatch(getBooksList(1, 10, searchText));
					return console.log(response);
				})
				.catch(err => console.log(err));
		} else {
			axios
				.put(
					`http://68.178.162.203:8080/application-test-v1.1/books/${formData?.id}`,
					formData
				)
				.then(response => {
					closeModal();
					dispatch(getBooksList(1, 10, searchText));
					return console.log(response);
				})
				.catch(err => console.log(err));
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			contentLabel="Book Modal"
			className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
			overlayClassName="modal-overlay fixed inset-0"
		>
			<div className="bg-white w-96 p-6 rounded shadow-lg">
				<h2 className="text-2xl font-bold mb-4">Add Book Details</h2>
				<form className="space-y-4" onSubmit={handleSubmit}>
					{/* Input fields with Tailwind CSS classes */}
					<div className="flex justify-between">
						<label className="text-gray-600">ID:</label>
						<input
							type="number"
							name="id"
							value={formData.id}
							onChange={handleChange}
							required
							className="input"
							disabled={!isAdding}
						/>
					</div>
					<div className="flex justify-between">
						<label className="text-gray-600">Author:</label>
						<input
							type="text"
							name="author"
							value={formData.author}
							onChange={handleChange}
							required
							className="input"
						/>
					</div>
					<div className="flex justify-between">
						<label className="text-gray-600">Title:</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
							className="input"
						/>
					</div>
					<div className="flex justify-between">
						<label className="text-gray-600">Language:</label>
						<input
							type="text"
							name="language"
							value={formData.language}
							onChange={handleChange}
							required
							className="input"
						/>
					</div>
					<div className="flex justify-between">
						<label className="text-gray-600">Year:</label>
						<input
							type="number"
							name="year"
							value={formData.year}
							onChange={handleChange}
							required
							className="input"
						/>
					</div>
					<div className="flex justify-between">
						<label className="text-gray-600">Pages:</label>
						<input
							type="number"
							name="pages"
							value={formData.pages}
							onChange={handleChange}
							required
							className="input"
						/>
					</div>
					<div className="flex justify-between">
						<label className="text-gray-600">Country:</label>
						<input
							type="text"
							name="country"
							value={formData.country}
							onChange={handleChange}
							required
							className="input"
						/>
					</div>
					<div className="flex justify-between">
						<label className="text-gray-600">Link:</label>
						<input
							type="text"
							name="link"
							value={formData.link}
							onChange={handleChange}
							required
							className="input"
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded"
						>
							Submit
						</button>
						<button
							type="button"
							onClick={closeModal}
							className="bg-red-500 text-white px-4 py-2 rounded ml-2"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default BookModal;
