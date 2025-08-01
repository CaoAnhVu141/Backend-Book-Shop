import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from 'src/users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';

@Injectable()
export class RolesService {

  constructor(
      @InjectModel(Role.name)
      private roleModel: SoftDeleteModel<RoleDocument>
    ) { }
  async createRoleService(createRoleDto: CreateRoleDto, user: IUser) {
      const {name,description} = createRoleDto;
      let roles = await this.roleModel.create({
        name,description,
        createdBy: {
          _id: user._id,
          email: user.email
        }
      });
      return roles;
  }

 async getAllRoleSercice(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.roleModel.find(filter)
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

  async getOneRoleService(id: string) {
    const role = await this.roleModel.findById(id);
    console.log(role)
    if(!role || role.isDeleted){
      throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
    return role;
  }

   async updateRoleService(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
      const role = await this.roleModel.findById(id);
      if(!role || role.isDeleted){
        throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xoá");
      }

     return await this.roleModel.updateOne(
        { _id: id },
        { ...updateRoleDto }, {
        updateBy: {
          _id: user._id,
          email: user.email
        }
      });
  }

 async removeRoleService(id: string, user: IUser) {
    const role = await this.roleModel.findById(id);
      if(!role || role.isDeleted){
        throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xoá");
      }
      await this.roleModel.updateOne(
        {_id: id},
       {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
       }); 
      return await this.roleModel.softDelete({_id: id});
  }
}
