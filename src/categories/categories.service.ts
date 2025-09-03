import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name)
    private categoryModel: SoftDeleteModel<CategoryDocument>
  ) { }

  async createCategoryService(createCategoryDto: CreateCategoryDto, user: IUser) {
    const { name, description } = createCategoryDto;

    const checkName = await this.categoryModel.findOne({name});
    if(checkName){
      throw new BadRequestException(`${checkName.name} đã tồn tại trong hệ thống`);
    }

    let category = await this.categoryModel.create({
      name, description,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return category;
  }

  async getAllCategoryService(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    if(filter?.name){
      filter.name = { $regex: filter.name, $options: 'i' };
    }
    if(filter?.description){
      filter.description = {$regex: filter.description, $options: 'i'};
    }

    //thực hiện fillter startDate và endDate
    if(filter?.startDate || filter?.endDate){
      const createdAt: any{};
      if(filter.startDate){
        createdAt.$gte = new Date(filter.startDate);
      }
      if(filter.endDate){
        const dataEndDate = new Date(filter.endDate);
        dataEndDate.setHours(23,59,59,999);
        filter.$lte = dataEndDate;
      }
      filter.createdAt = createdAt;
      delete filter.startDate;
      delete filter.endDate;
    }

    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.categoryModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);


    const result = await this.categoryModel.find(filter)
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

  async getOneCategoryService(id: string) {
    return await this.categoryModel.findById(id);
  }

  async updateCategoryService(id: string, updateCategoryDto: UpdateCategoryDto, user: IUser) {
    const category = await this.categoryModel.findById(id);
    if (!category || category.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
    return await this.categoryModel.updateOne(
      { _id: id },
      {
        ...updateCategoryDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
  }

  async removeCategoryService(id: string, user: IUser) {
    const category = await this.categoryModel.findById(id);
    if (!category || category.isDeleted) {
      throw new NotFoundException("Dữ liệu không tồn tại hoặc đã bị xóa");
    }
    await this.categoryModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email
        }
      }
    )
    return await this.categoryModel.softDelete({ _id: id })
  }

}
