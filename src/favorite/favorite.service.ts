import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name)
    private favoriteModel: SoftDeleteModel<FavoriteDocument>
  ) { }

  async createFavoriteService(createFavoriteDto: CreateFavoriteDto, user: IUser) {
    const { book_id, user_id } = createFavoriteDto;
    if(book_id){
      throw new BadRequestException("Dữ liệu sách đã được thêm vào");
    }
    let favorite = await this.favoriteModel.create(
      {
        book_id, user_id,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      })
    return favorite;
  }

 async getAllFavoriteService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.favoriteModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.favoriteModel.find(filter)
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

  // findOne(id: number) {
  //   return `This action returns a #${id} favorite`;
  // }

  // update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
  //   return `This action updates a #${id} favorite`;
  // }

 async removeFavoriteService(id: string,user: IUser) {
    const favorite = await this.favoriteModel.findById(id);
    if(!favorite || favorite.isDeleted){
      throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
    
    await this.favoriteModel.updateOne(
      {_id: id},
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      });
      return await this.favoriteModel.softDelete({_id: id});
  }
}
