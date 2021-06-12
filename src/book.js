/* eslint-disable require-jsdoc */
import {nanoid} from "nanoid";


class Book {
  constructor(request) {
    this.id = nanoid(16);

    this.name = request.payload.name;

    this.year = request.payload.year;

    this.author = request.payload.author;

    this.summary = request.payload.summary;

    this.publisher = request.payload.publisher;

    this.pageCount = request.payload.pageCount;

    this.readPage = request.payload.readPage;

    this.finished = this.pageCount === this.readPage;

    this.insertedAt = new Date().toISOString();

    this.updatedAt = this.insertedAt;

    this.reading =request.payload.reading;
  }

  updateValue(request) {
    this.name = request.payload.name;

    if (request.payload.year) this.year = request.payload.year;

    if (request.payload.author) this.author = request.payload.author;

    if (request.payload.summary) this.summary = request.payload.summary;

    if (request.payload.publisher) this.publisher = request.payload.publisher;

    if (request.payload.pageCount) this.pageCount = request.payload.pageCount;

    if (request.payload.readPage) this.readPage = request.payload.readPage;

    if (request.payload.reading) this.reading = request.payload.reading;

    this.updatedAt = new Date().toISOString();
  }
}

export {Book};


