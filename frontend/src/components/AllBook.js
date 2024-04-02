import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AllBook = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/addBook');
  };

  const handleSearch = () => {
    navigate('/search');
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleEdit = (bookId) => {
    navigate('/updateBook')
    console.log('Edit book with ID:', bookId);
  };

  const handleDelete = (bookId) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:5000/deleteBook/${bookId}`, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Book deleted successfully');
      } else {
        console.error('Failed to delete book. Status:', xhr.status);
      }
    };
    xhr.onerror = function () {
      console.error('Error deleting book. Network error');
    };
    xhr.send();
  };
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/?page=${page}&pageSize=${pageSize}`);
        setBooks(response.data.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [page, pageSize]);




  return (
    <div className="container mt-5">
      <h2>All Books</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Published Year</th>
            <th>Quantity Available</th>
            <th>Author Name</th>
            <th>Genre ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(books) && books.map((book, index) => (
            <tr key={index}>
              <td>{book.book_id}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.published_year}</td>
              <td>{book.quantity_available}</td>
              <td>{book.author_name}</td>
              <td>{book.genre_id}</td>
              <td>
                <button className="btn btn-primary btn-sm mx-2" onClick={() => handleEdit(book.book_id)}>Edit</button>
                <button className="btn btn-danger btn-sm mx-2" onClick={() => handleDelete(book.book_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary btn-sm" type="button" onClick={handleClick}>Add Book</button>
      <button className="btn btn-primary btn-sm mx-4" type="button" onClick={handleSearch}>Search</button>

      <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handlePreviousPage} disabled={page === 1}>Previous Page</button>
      <span className="mx-2">Page {page}</span>
      <button className="btn btn-primary btn-sm mx-5" type="button" onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default AllBook;
