import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Book } from './book.model';
import { BookEvents } from './enums';

export class BooksEventHandler {
  logger = new Logger(BooksEventHandler.name);
  @OnEvent(BookEvents.BOOK_CREATED)
  handleBookCreated(payload: Book) {
    this.logger.verbose(`New book created: ${payload}`);
  }
}
