import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class WarehouseService {

  constructor(
    @InjectModel(Warehouse.name)
    private wareHouseModel: SoftDeleteModel<WarehouseDocument>,
  ) { }

  async createWareHouseService(createWarehouseDto: CreateWarehouseDto, user: IUser) {
    const {name, description, location, status} = createWarehouseDto;

    const checkName = await this.wareHouseModel.findOne({name});
    if(checkName){
      throw new BadRequestException(`${checkName.name} đã tồn tại trong hệ trống`);
    }

    let wareHouse = await this.wareHouseModel.create({
      name, description, location, status,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return wareHouse;
  }

  async getAllWareHouseService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.wareHouseModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.wareHouseModel.find(filter)
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

  findOne(id: number) {
    return `This action returns a #${id} warehouse`;
  }

  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return `This action updates a #${id} warehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}
