import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookInput } from './book.input';
import { Book } from './book.model';
import { BooksService } from './books.service';

@Resolver(Book)
export class BookResolver {
  constructor(private readonly bookService: BooksService) {}

  @Mutation(() => Book)
  async create(
    @Args('input', { type: () => BookInput }) input: BookInput,
  ): Promise<Book> {
    return await this.bookService.create(input);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: BookInput,
  ): Promise<Book> {
    return this.bookService.update(id, input);
  }

  @Mutation(() => Book)
  async deleteBook(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.bookService.delete(id);
  }

  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(() => Book)
  async book(@Args('id', { type: () => ID }) id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }
}
