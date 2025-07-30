import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ResponseMessage("Create role success")
  createRoleController(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    return this.rolesService.createRoleService(createRoleDto,user);
  }

  @Get()
  @ResponseMessage("Get all roles success")
  getAllRoleController(@Query("current") currentPage: string, @Query("pageSize") limit: string, @Query() qs: string) {
    return this.rolesService.getAllRoleSercice(+currentPage,+limit,qs);
  }

  @Get(':id')
  @ResponseMessage("Get one role success")
  getOneRoleController(@Param('id') id: string) {
    return this.rolesService.getOneRoleService(id);
  }

  @Patch(':id')
  @ResponseMessage("Update role success")
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user: IUser) {
    return this.rolesService.updateRoleService(id, updateRoleDto,user);
  }

  @Delete(':id')
  @ResponseMessage("Delete role success")
  removeRoleController(@Param('id') id: string, @User() user: IUser) {
    return this.rolesService.removeRoleService(id,user);
  }
}