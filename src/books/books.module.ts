import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book.model';
import { BooksEventHandler } from './books-event.handler';
import { BookResolver } from './books.resolver';
import { BooksService } from './books.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [BooksService, BookResolver, BooksEventHandler],
})
export class BooksModule {}
