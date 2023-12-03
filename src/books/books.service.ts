import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookInput } from './book.input';
import { Book } from './book.model';
import { BookEvents } from './enums';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(input: BookInput): Promise<Book> {
    const book = await this.bookModel.create(input);
    this.eventEmitter.emit(BookEvents.BOOK_CREATED, book);
    return book;
  }

  async update(id: string, input: BookInput): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, input);
  }

  async delete(id: string): Promise<boolean> {
    return (await this.bookModel.deleteOne({ _id: id })).deletedCount > 0;
  }
  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findOne({ _id: id });
  }

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find();
  }
}
