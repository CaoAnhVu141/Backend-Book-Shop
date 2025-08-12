import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User as UserM, UserDocument } from './schemas/user.schema';

import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { UsersModule } from './users.module';
import aqp from 'api-query-params';
import { IUser } from './users.interface';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(UserM.name)
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) { }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async createNewService(createUserDto: CreateUserDto, user: IUser) {
    const {
      name, email, password, age, gender,avatar, role
    } = createUserDto;

    const checkEmail = await this.userModel.findOne({email});
    if (checkEmail) {
      throw new BadRequestException(`Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`)
    }
    
    const handlePassword = this.getHashPassword(password);

    return await this.userModel.create({
      name: name, email: email, password: handlePassword, age: age, gender: gender, avatar: avatar, role: role,
      createdBy: {
        _id: user._id,
        email: user.email,
      }
    });
  }

  async getAllUserService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.userModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .select('-password')
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

  async findOneUserService(id: string) {
      return await this.userModel.findById(id).populate({ path: "role", select: {name:1} });
  }

  findOneByUsername(email: string) {
    return this.userModel.findOne({
      email: email,
    }).populate({ path: "role", select: { name: 1 } });
  }

  async updateUserService(id: string, updateUserDto: UpdateUserDto) {
    const {name,email,age,gender} = updateUserDto;
    const userData = await this.userModel.findById(id);
    if (!userData || userData.isDeleted) {
      throw new NotFoundException("Tài khoản không tồn tại");
    }
    // const userEmail = await this.userModel.findOne({email});
    // if(userEmail){
    //     throw new ConflictException("Email đã tồn tại trong hệ thống");
    // }
   return await this.userModel.updateOne({
      _id: id
    }, {
        ...updateUserDto
    });
  }

  async removeByIdService(id: string) {
    const userData = await this.userModel.findById(id);
    if (!userData || userData.isDeleted) {
      throw new NotFoundException("Tài khoản không tồn tại");
    }
    await this.userModel.updateOne({
      _id: id,
    },{
      isDeleted: true
    })
    return this.userModel.softDelete({ _id: id });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  // update user with refresh_token when login 
  updateUserFunction = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne({ _id }, { refreshToken }).populate({
      path: "role",
      select: {name:1}
    });
  }

  findUserByToken = async (refreshToken: string) => {
    return await this.userModel.findOne({ refreshToken });
  }

  // Register
  async registerUserService(user: RegisterUserDto){
      const {name,email,password, role} = user;
      const checkEmail = await this.userModel.findOne({email});
      if(checkEmail){
        throw new BadRequestException(`Email: ${email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác.`)
      }
      const roleUser = (await this.roleModel.findOne({name: "USER"}));
      console.log("role user: ", roleUser);
      const hashPassword = this.getHashPassword(password);
      let dataRegister = await this.userModel.create({
        name,
        email,
        password: hashPassword,
        role: roleUser._id,
      });
      return dataRegister;
  }

  // to do filter user
  async filterUserService(filteruserdto: FilterUserDto){
    const {name} = filteruserdto;
      const response = await this.userModel.find({
        name: {$regex: name, $options: 'i'}
      });
      return response;
  }
}
