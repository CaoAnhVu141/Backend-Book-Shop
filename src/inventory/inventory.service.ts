import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Inventory, InventoryDocument } from './schemas/inventory.schema';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class InventoryService {

  constructor(
      @InjectModel(Inventory.name)
      private inventoryModel: SoftDeleteModel<InventoryDocument>
    ) { }

  async createInventoryService(createInventoryDto: CreateInventoryDto, user: IUser) {
    const {
      book, warehouse, quantity } = createInventoryDto;

      const inventory = await this.inventoryModel.create({
        book,  warehouse, quantity,
        createdBy: {
          _id: user._id,
          email: user.email,
        }
      });
      return inventory
  }

  findAll() {
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    return `This action updates a #${id} inventory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
