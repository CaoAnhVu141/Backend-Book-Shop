import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const { name, description, location, status } = createWarehouseDto;

    const checkName = await this.wareHouseModel.findOne({ name });
    if (checkName) {
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

  async findOneWareHouseService(_id: string) {
    const wareHouse = await this.wareHouseModel.findById({ _id });
    if (!wareHouse || wareHouse.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    return wareHouse;
  }

  async updateWareHouseSerice(id: string, updateWarehouseDto: UpdateWarehouseDto, user: IUser) {
    const wareHouse = await this.wareHouseModel.findById(id);
    if (!wareHouse || wareHouse.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    return await this.wareHouseModel.updateOne(
      { _id: id },
      { ...updateWarehouseDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async removeWareHouseService(id: string, user: IUser) {
    const wareHouse = await this.wareHouseModel.findById({ id });
    if (!wareHouse || wareHouse.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    await this.wareHouseModel.updateOne({
      _id: id
    },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      });
    return await this.wareHouseModel.softDelete({ _id: id });
  }
}
