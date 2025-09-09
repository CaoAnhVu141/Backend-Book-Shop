import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Inventory, InventoryDocument } from './schemas/inventory.schema';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';
import { Book, BookDocument } from 'src/books/schemas/book.schema';
import { Warehouse, WarehouseDocument } from 'src/warehouse/schemas/warehouse.schema';

@Injectable()
export class InventoryService {

  constructor(
    @InjectModel(Inventory.name)
    private inventoryModel: SoftDeleteModel<InventoryDocument>,

    @InjectModel(Book.name)
    private bookModel: SoftDeleteModel<BookDocument>,

    @InjectModel(Warehouse.name)
    private warehouseModel: SoftDeleteModel<WarehouseDocument>

  ) { }

  async createInventoryService(createInventoryDto: CreateInventoryDto, user: IUser)
   {
    const {book: bookName, warehouse: warehouseName, quantity } = createInventoryDto;

    const dataBook = await this.bookModel.findOne({name: bookName});
    if(!dataBook || dataBook.isDeleted){
      throw new NotFoundException(`Dữ liệu sách không tồn tại`);
    }

    const dataWarehouse = await this.warehouseModel.findOne({name: warehouseName});
    if(!dataWarehouse || dataWarehouse.isDeleted){
      throw new NotFoundException(`Dữ liệu kho không tồn tại`);
    }

    const inventory = await this.inventoryModel.create({
      book: dataBook._id, warehouse: dataWarehouse._id, quantity,
      createdBy: {
        _id: user._id,
        email: user.email,
      }
    });
    return inventory
  }

  async getAllInventoryService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.inventoryModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.inventoryModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate([
        { path: "book", select: { name: 1 } },
        { path: "warehouse", select: { name: 1 } }
      ])
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

  async findOneInventoryService(id: string) {
    const inventory = await this.inventoryModel.findById({ _id: id }).populate({ path: "book", select: { name: 1 } }).
    populate({ path: "warehouse", select: { name: 1 } });
    console.log("check inventory: ", inventory);
    if (!inventory || inventory.isDeleted) {
      throw new NotFoundException("Dữ liệu tồn kho không tồn tại");
    }
    return inventory;
  }

  async updateInventoryService(id: string, updateInventoryDto: UpdateInventoryDto, user: IUser) {
    const inventory = await this.inventoryModel.findById({_id: id});
    if(!inventory || inventory.isDeleted){
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    return await this.inventoryModel.updateOne(
      {_id: id},
      {
        updateInventoryDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      });
  }

  async removeInventoryService(id: string, user: IUser) {
    const inventory = await this.inventoryModel.findById({ _id: id });
    if (!inventory || inventory.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại");
    }
    await this.inventoryModel.updateOne({
      _id: id,
    },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      });
    return await this.inventoryModel.softDelete({_id: id});
  }
}
