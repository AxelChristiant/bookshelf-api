/* eslint-disable max-len */
import {books} from "./books.js";
import {Book} from "./book.js";
import * as response from "./response.js";

export const addBook = (request, h) => {
  if (request.payload.name && (request.payload.readPage <= request.payload.pageCount)) {
    const newBook = new Book(request);
    books.push(newBook);
    return response.success(h, 201, "Buku berhasil ditambahkan", {bookId: newBook.id});
  }
  if (!request.payload.name) return response.fail(h, 400, "Gagal menambahkan buku. Mohon isi nama buku");

  if (request.payload.readPage > request.payload.pageCount) return response.fail(h, 400, "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");

  return response.error(h, 500, "Buku gagal ditambahkan");
};

const getBookData = (data) => ({
  books: data.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  })),
});

export const getAllBooks = (request, h) => {
  const {name, reading, finished} = request.query;

  if (name) {
    const bookByName = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const data = getBookData(bookByName);
    return response.success(h, 200, "", data);
  }

  if (reading) {
    const bookByReading = books.filter((book) => book.reading === Boolean(reading));
    const data = getBookData(bookByReading);
    return response.success(h, 200, "", data);
  }

  if (finished) {
    const finishedBook = books.filter((book) => book.finished === Boolean(parseInt(finished)));
    const data = getBookData(finishedBook);
    return response.success(h, 200, "", data);
  }

  const data = getBookData(books);
  return response.success(h, 200, "", data);
};


export const getBookById = (request, h) => {
  const {bookId} = request.params;

  const bookById = books.find((book) => book.id === bookId);
  if (bookById) {
    return response.success(h, 200, "", {book: bookById});
  }

  return response.fail(h, 404, "Buku tidak ditemukan");
};

export const editBookById = (request, h) => {
  const {bookId} = request.params;

  const booksIndex = books.findIndex((book) => book.id === bookId);
  if (booksIndex > -1) {
    if (!request.payload.name) {
      return response.fail(h, 400, "Gagal memperbarui buku. Mohon isi nama buku");
    }

    if (request.payload.readPage > request.payload.pageCount) {
      return response.fail(h, 400, "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount");
    }
    books[booksIndex].updateValue(request);

    return response.success(h, 200, "Buku berhasil diperbarui", "");
  }

  return response.fail(h, 404, "Gagal memperbarui buku. Id tidak ditemukan");
};

export const deleteBookById = (request, h) => {
  const {bookId} = request.params;

  const booksIndex = books.findIndex((book) => book.id === bookId);
  if (booksIndex > -1) {
    books.splice(booksIndex);

    return response.success(h, 200, "Buku berhasil dihapus");
  }

  return response.fail(h, 404, "Buku gagal dihapus. Id tidak ditemukan");
};


