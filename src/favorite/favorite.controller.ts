import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  @ResponseMessage("Created favorite success")
  create(@Body() createFavoriteDto: CreateFavoriteDto, @User() user: IUser) {
    return this.favoriteService.createFavoriteService(createFavoriteDto,user);
  }

  @Get()
  @ResponseMessage("Get all favorite success")
  getAllFavoriteController(@Query("current") currentPage: string, @Query("pageSize") limit: string, @Query() qs: string) {
    return this.favoriteService.getAllFavoriteService(+currentPage,+limit,qs);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favoriteService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
  //   return this.favoriteService.update(+id, updateFavoriteDto);
  // }

  @Delete(':id')
  @ResponseMessage("Delete favorite success")
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.favoriteService.removeFavoriteService(id,user);
  }
}
