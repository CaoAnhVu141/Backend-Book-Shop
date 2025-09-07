import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class ReviewService {

  constructor(
    @InjectModel(Review.name)
    private reviewModel: SoftDeleteModel<ReviewDocument>
  ){}

  async createReviewService(createReviewDto: CreateReviewDto, users: IUser) {
    const {user, book, comment,rating, images} = createReviewDto;

    const review = await this.reviewModel.create({
      user, book, rating, comment,
      createdBy: {
        _id: users._id,
        email: users.email,
      }
    });
    return review;
  }

  getAllReviewService() {
    return `This action returns all review`;
  }

  async findOneReviewService(id: string) {
    const review = await this.reviewModel.findById({_id:  id});
    if(!review || review.isDeleted){
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
