import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ResponseMessage("Created book success")
  createBookController(@Body() createBookDto: CreateBookDto, @User() user: IUser) {
    return this.booksService.createBookService(createBookDto,user);
  }

  @Get()
  @ResponseMessage("Get book success")
  getAllBookController(@Query("current") currentPage: string, @Query("pageSize") limit: string, @Query() qs: string) {
    return this.booksService.getAllBookService(+currentPage,+limit,qs);
  }

  @Get(':id')
  @ResponseMessage("Get one book success")
  getOneBookController(@Param('id') id: string) {
    return this.booksService.getOneBookService(id);
  }

  @Patch(':id')
  @ResponseMessage("Update book success")
  updateBookController(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto,@User() user: IUser) {
    return this.booksService.updateBookService(id, updateBookDto,user);
  }

  @Delete(':id')
  @ResponseMessage("Delete book success")
  removeBookController(@Param('id') id: string, @User() user: IUser) {
    return this.booksService.removeBookService(id,user);
  }
}
