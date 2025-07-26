import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ResponseMessage("Created author success")
  createAuthorController(@Body() createAuthorDto: CreateAuthorDto, @User() user: IUser) {
    return this.authorsService.createAuthorService(createAuthorDto, user);
  }

  @Get()
  @ResponseMessage("Created author success")
  getAllAuthorController(@Query("current") currentPage: string,
      @Query("pageSize") limit: string,
      @Query() qs: string) {
    return this.authorsService.getAllAuthorService(+currentPage,+limit,qs);
  }

  @Get(':id')
  @ResponseMessage("Get one author success")
  getOneAuthorController(@Param('id') id: string) {
    return this.authorsService.getOneAuthorService(id);
  }

  @Patch(':id')
  @ResponseMessage("Update author success")
  updateAuthorController(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto, @User() user: IUser) {
    return this.authorsService.updateAuthorService(id, updateAuthorDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete author success")
  removeAuthorController(@Param('id') id: string, @User() user: IUser) {
    return this.authorsService.removeAuthorService(id, user);
  }
}
