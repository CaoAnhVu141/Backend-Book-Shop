import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressDocument } from './schemas/address.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class AddressService {

  constructor(
    @InjectModel(Address.name)
    private addressModule: SoftDeleteModel<AddressDocument>
  ) { }

  async createAddressUserService(createAddressDto: CreateAddressDto, byUser: IUser) {
    const {user, homenumber,ward,province,type} = createAddressDto;
    const address = await this.addressModule.create({
      user,homenumber,ward,province,type,
      createdBy: {
        _id: byUser._id,
        email: byUser.email
      }
    });
    return address;
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
