import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ResponseMessage("Created category success")
  createCategoryController(@Body() createCategoryDto: CreateCategoryDto, @User() user: IUser) {
    return this.categoriesService.createCategoryService(createCategoryDto,user);
  }

  @Get()
  @Public()
  @ResponseMessage("Get category success")
  findAllCategoryController(@Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.categoriesService.getAllCategoryService(+currentPage, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage("Get one category success")
  findOneCategoryController(@Param('id') id: string) {
    return this.categoriesService.getOneCategoryService(id);
  }

  @Patch(':id')
  @ResponseMessage("Update category success")
  updateCategoryController(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @User() user: IUser) {
    return this.categoriesService.updateCategoryService(id, updateCategoryDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Remove categoty success")
  removeCategoryController(@Param('id') id: string, @User() user: IUser) {
    return this.categoriesService.removeCategoryService(id,user);
  }
}
