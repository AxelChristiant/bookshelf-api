/* eslint-disable max-len */

import {addBookHandler, getAllBooksHandler, getBookByIdHandler} from "./handler.js";

export const routes=[
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },


];