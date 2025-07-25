import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ResponseMessage("Create book success")
  createBookController(@Body() createBookDto: CreateBookDto, @User() user: IUser) {
    return this.bookService.createBookService(createBookDto,user);
  }

  @Get()
  @ResponseMessage("Get all books success")
  findAll(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.bookService.getAllBookService(+currentPage,+limit,qs);
  }

  @Get(':id')
  @ResponseMessage("Get book by id success")
  findOne(@Param('id') id: string) {
    return this.bookService.getBookByIdService(id);
  }

  @Patch(':id')
  @ResponseMessage("Update book success")
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto,@User() user: IUser) {
    return this.bookService.updateBookService(id, updateBookDto,user);
  }

  @Delete(':id')
  @ResponseMessage("Delete book success")
  removeBookController(@Param('id') id: string, @User() user: IUser) {
    return this.bookService.removeBookService(id,user);
  }
}
