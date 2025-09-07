import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  @ResponseMessage("Create review success")
  createReviewController(@Body() createReviewDto: CreateReviewDto, @User() user: IUser) {
    return this.reviewService.createReviewService(createReviewDto, user);
  }

  @Get()
  @ResponseMessage("Get all review success")
  getAllReviewController(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.reviewService.getAllReviewService(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Fetch review by id success")
  findOneReviewController(@Param('id') id: string) {
    return this.reviewService.findOneReviewService(id);
  }

  @Patch(':id')
  @ResponseMessage("Update review success")
  updateReviewController(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @User() user: IUser) {
    return this.reviewService.updateReviewService(id, updateReviewDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Remove review success")
  removeReviewController(@Param('id') id: string, @User() user: IUser) {
    return this.reviewService.removeReviewService(id, user);
  }
}
