/* eslint-disable max-len */
import {books} from "./books.js";
import {Book} from "./book.js";
import {responseError, responseFail, responseSuccess} from "./handlerResponse.js";

const addBookHandler = (request, h) => {
  if (request.payload.name && (request.payload.readPage <= request.payload.pageCount)) {
    const newBook = new Book(request);
    books.push(newBook);
    return responseSuccess(h, 201, "Buku berhasil ditambahkan", {bookId: newBook.id});
  }
  if (!request.payload.name) return responseFail(h, 400, "Gagal menambahkan buku. Mohon isi nama buku");

  if (request.payload.readPage > request.payload.pageCount) return responseFail(h, 400, "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");

  return responseError(h, 500, "Buku gagal ditambahkan");
};

const getAllBooksHandler = (request, h) => {
  const getData = (data) => ({
    books: data.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    })),
  });
  const data = getData(books);
  return responseSuccess(h, 200, "", data);
};

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;

  const findBook = books.find((book) => book.id === bookId);
  if (findBook) {
    return responseSuccess(h, 200, "", {book: findBook});
  }

  return responseFail(h, 404, "Buku tidak ditemukan");
};

const editBookByIdHandler = (request, h) => {
  const {bookId} = request.params;

  const found = books.findIndex((book) => book.id === bookId);
  if (found !== -1) {
    if (!request.payload.name) {
      return responseFail(h, 400, "Gagal memperbarui buku. Mohon isi nama buku");
    }

    if (request.payload.readPage > request.payload.pageCount) {
      return responseFail(h, 400, "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount");
    }

    books[found].updateValue(request);

    return responseSuccess(h, 200, "Buku berhasil diperbarui", undefined);
  }

  return responseFail(h, 404, "Gagal memperbarui buku. Id tidak ditemukan");
};

const deleteBookByIdHandler = (request, h) => {
  const {bookId} = request.params;

  const found = books.findIndex((book) => book.id === bookId);
  if (found !== -1) {
    books.splice(found);

    return responseSuccess(h, 200, "Buku berhasil dihapus");
  }

  return responseFail(h, 404, "Buku gagal dihapus. Id tidak ditemukan");
};

export {
  addBookHandler, getAllBooksHandler, getBookByIdHandler
  , editBookByIdHandler, deleteBookByIdHandler,
};
