import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User, Roles } from 'src/decorator/customize';

import { IUser } from './users.interface';
import { RolesGuard } from 'src/guard/roles.guard';
import { FilterUserDto } from './dto/filter-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles("Admin")
  @ResponseMessage("Create user success")
  @Post()
  createUserController(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    return this.usersService.createNewService(createUserDto, user);
  }

  @Public()
  @Get()
  @ResponseMessage("Fetch list users success")
  findAllUserController(@Query("current") currentPage: string, @Query("pageSize") limit: string, @Query() qs: string) {
    return this.usersService.getAllUserService(+currentPage, +limit, qs);
  }

  @Get('search')
  @ResponseMessage("Filter user success")
  filterUserController(@Query() filteruserdto: FilterUserDto){
    console.log("check name user filter: ",filteruserdto.name);
    return this.usersService.filterUserService(filteruserdto);
  }

  @Get(':id')
  @ResponseMessage("Get user by id success")
  findOneUserController(@Param('id') id: string) {
    return this.usersService.findOneUserService(id);
  }

  @Public()
  @Patch(':id')
  @ResponseMessage("Update user success")
  updateUserController(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserService(id, updateUserDto);
  }

  @Public()
  @Delete(':id')
  @ResponseMessage("Delete user by id success")
  removeByIdController(@Param('id') id: string) {
    return this.usersService.removeByIdService(id);
  }

  
}
