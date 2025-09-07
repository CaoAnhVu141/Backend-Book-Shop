import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ResponseMessage("Create review success")
  createReviewController(@Body() createReviewDto: CreateReviewDto, @User() user: IUser) {
    return this.reviewService.createReviewService(createReviewDto, user);
  }

  @Get()
  findAll() {
    return this.reviewService.getAllReviewService();
  }

  @Get(':id')
  @ResponseMessage("Fetch review by id success")
  findOneReviewController(@Param('id') id: string) {
    return this.reviewService.findOneReviewService(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
