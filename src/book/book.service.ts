import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.shema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class BookService {

  constructor(
      @InjectModel(Book.name)
      private bookModel: SoftDeleteModel<BookDocument>,
  
    ) { }

 async createBookService(createBookDto: CreateBookDto, user: IUser) {
      return await this.bookModel.create({
        ...createBookDto,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      });
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
      result //kết quả query
    }
  }

 async getBookByIdService(id: string) {
      return await this.bookModel.findById(id);
  }

 async updateBookService(id: string, updateBookDto: UpdateBookDto,user: IUser) {
    const checkBook = await this.bookModel.findById(id);
    if(!checkBook || checkBook.isDeleted){ 
      throw new NotFoundException("Book không tồn tại hoặc đã bị xóa");
    }
    return await this.bookModel.updateOne({
        _id: id,
      },{
        ...updateBookDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      });
  }

 async removeBookService(id: string, user: IUser) {
    const checkBook = await this.bookModel.findById(id);
    if(!checkBook || checkBook.isDeleted){ 
      throw new NotFoundException("Book không tồn tại hoặc đã bị xóa");
    }
    await this.bookModel.updateOne({
      _id: id,
    },{
       updatedBy: {
          _id: user._id,
          email: user.email
       }
    });
    return await this.bookModel.softDelete({
      _id: id,
    });
  }
}
