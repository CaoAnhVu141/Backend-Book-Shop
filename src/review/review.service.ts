import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class ReviewService {

  constructor(
    @InjectModel(Review.name)
    private reviewModel: SoftDeleteModel<ReviewDocument>
  ) { }

  async createReviewService(createReviewDto: CreateReviewDto, users: IUser) {
    const { user, book, comment, rating, images } = createReviewDto;

    const review = await this.reviewModel.create({
      user, book, rating, comment,
      createdBy: {
        _id: users._id,
        email: users.email,
      }
    });
    return review;
  }

  async getAllReviewService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.reviewModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.reviewModel.find(filter)
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

  async findOneReviewService(id: string) {
    const review = await this.reviewModel.findById({ _id: id });
    if (!review || review.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    return review;
  }

  async updateReviewService(id: string, updateReviewDto: UpdateReviewDto, user: IUser) {
    const review = await this.reviewModel.findById({ _id: id });
    if (!review || review.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    const dataUpdate = await this.reviewModel.updateOne({
      _id: id,
    }, {
      ...updateReviewDto,
      updatedBy: {
        _id: user._id,
        email: user.email,
      }
    });
    return dataUpdate;
  }

  async removeReviewService(id: string, user: IUser) {
    const review = await this.reviewModel.findById({ _id: id });
    if (!review || review.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    await this.reviewModel.updateOne({
      _id: id,
    }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    });
    return await this.reviewModel.softDelete({ _id: id });
  }
}
