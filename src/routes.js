/* eslint-disable max-len */

import * as handler from "./handler.js";

export const routes=[
  {
    method: "POST",
    path: "/books",
    handler: handler.addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: handler.getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: handler.getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: handler.editBookById,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: handler.deleteBookById,
  },

];
