import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { filter } from 'rxjs';

@Injectable()
export class AuthorsService {

  constructor(
    @InjectModel(Author.name)
    private authorModel: SoftDeleteModel<AuthorDocument>
  ) { }

  async createAuthorService(createAuthorDto: CreateAuthorDto, user: IUser) {
    const { name, bio, avatar, is_popular } = createAuthorDto;

    const checkName = await this.authorModel.findOne({name});

    if(checkName){
      throw new BadRequestException(`${checkName.name} đã tồn tại trong hệ thống`);
    }

    let author = await this.authorModel.create({
      name, bio, avatar, is_popular: true, createdBy: {
        _id: user._id,
        email: user.email
      }
    })
    return author;
  }

  async getAllAuthorService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    if(filter?.name){
      filter.name = { $regex: filter.name, $options: 'i' };
    }
    if(filter?.bio){
      filter.bio = { $regex: filter.bio, $options: 'i' };
    }

    //thực hiện fillter startDate và endDate
    if(filter?.startDate || filter?.endDate){
      const createdAt: any = {};

      if(filter.startDate){
        createdAt.$gte = new Date(filter.startDate);
      }
      if(filter.endDate){
        const dataEndDate = new Date(filter.endDate);
        dataEndDate.setHours(23,59,59,999);
        createdAt.$gte = dataEndDate;
      }
      filter.createdAt = createdAt;
      delete filter.startDate;
      delete filter.endDate;
    }

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.authorModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.authorModel.find(filter)
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

  async getOneAuthorService(id: string) {
    // return await this.authorModel.findById(id);
    const author = await this.authorModel.findById(id);
    if(!author || author.isDeleted){
        throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
    return author;
  }

  async updateAuthorService(id: string, updateAuthorDto: UpdateAuthorDto, user: IUser) {
      const author = await this.authorModel.findById(id);
      if(!author || author.isDeleted){
        throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
   return await this.authorModel.updateOne(
      {_id: id},
      {
        ...updateAuthorDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
  }

  async removeAuthorService(id: string, user: IUser) {
    const author = await this.authorModel.findById(id);
    if(!author || author.isDeleted){
        throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }

    await this.authorModel.updateOne(
      {_id: id},
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      })
    return await this.authorModel.softDelete({_id: id});
  }
}
