import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';


const UpdateBook = (formData) => {

    const navigate = useNavigate()
  const [bookData, setBookData] = useState({
    book_id: formData.book_id,
    title: formData.title,
    description: formData.description,
    published_year: formData.published_year,
    quantity_available: formData.quantity_available,
    author_id: formData.author_id,
    genre_id: formData.genre_id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };
 


  const handleSubmit = (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:5000/updateBook/${bookData.book_id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Book updated successfully');
      } else {
        console.error('Failed to update book. Status:', xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error('Error updating book. Network error');
    };
    xhr.send(JSON.stringify(bookData));
    navigate('/')
    
  };

  return (
    <div className="container mt-5">
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={bookData.title} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={bookData.description} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="published_year" className="form-label">Published Year</label>
          <input type="text" className="form-control" id="published_year" name="published_year" value={bookData.published_year} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity_available" className="form-label">Quantity Available</label>
          <input type="text" className="form-control" id="quantity_available" name="quantity_available" value={bookData.quantity_available} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="author_id" className="form-label">Author ID</label>
          <input type="text" className="form-control" id="author_id" name="author_id" value={bookData.author_id} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="genre_id" className="form-label">Genre ID</label>
          <input type="text" className="form-control" id="genre_id" name="genre_id" value={bookData.genre_id} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
