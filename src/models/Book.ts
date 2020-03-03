import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export interface IBook {
  /** Name of the book */
  name: string;
  /** Name of the author */
  author: string;
}

export interface IBookDocument extends IBook, Document {
  toJSON(options?: DocumentToObjectOptions): IBook;
}

export type IBookModel = Model<IBookDocument>;

const schema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
});

const Book: IBookModel = model<IBookDocument, IBookModel>('Book', schema);

export default Book;
