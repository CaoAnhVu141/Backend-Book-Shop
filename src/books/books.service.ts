import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class BooksService {

    constructor(
      @InjectModel(Book.name)
      private bookModel: SoftDeleteModel<BookDocument>
    ) { }

  async createBookService(createBookDto: CreateBookDto, user: IUser) {
    const {name,description,price,stock, author_id,category_id} = createBookDto;
    
    let book = await this.bookModel.create({
      name,description,price,stock,author_id,category_id,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return book;
  }

  async getAllBookService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.bookModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.bookModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result
    }
  }

  async getOneBookService(id: string) {
    const book = await this.bookModel.findById(id);
    if(!book || book.isDeleted){
      throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
    return book;
  }

 async updateBookService(id: string, updateBookDto: UpdateBookDto,user: IUser) {
    const book = await this.bookModel.findById(id);
    if(!book || book.isDeleted){
      throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
   return await this.bookModel.updateOne(
      {_id: id},
      {...updateBookDto,
       updatedBy: {
        _id: user._id,
        email: user.email
       } 
      });
  }

  async removeBookService(id: string, user: IUser) {
    const book = await this.bookModel.findById(id);
    if(!book || book.isDeleted){
      throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
    await this.bookModel.updateOne(
      {_id: id},
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    return await this.bookModel.softDelete({_id: id});
  }
}
