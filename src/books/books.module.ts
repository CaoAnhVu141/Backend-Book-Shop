import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Author, AuthorSchema } from 'src/authors/schemas/author.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema },
    {name: Author.name, schema: AuthorSchema}
  ])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
