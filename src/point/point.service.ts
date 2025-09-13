import { Injectable } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Point, PointDocument } from './schemas/point.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class PointService {

  constructor(
    @InjectModel(Point.name)
    private pointModule: SoftDeleteModel<PointDocument>
  ) { }

  async createPointService(createPointDto: CreatePointDto) {

    const { user, order = null , point = 100, source = "checkin", isActive = true, createdAt = new Date(), updatedAt = new Date() } = createPointDto;

    // tính thời gian
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const existingCheckin = await this.pointModule.findOne({
      user: user,
      source: "checkin",
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    if (existingCheckin) {
      return {
        success: false,
        message: 'Bạn đã checkin hôm nay rồi!',
      };
    }

    let pointData = await this.pointModule.create({
      user: user, order: order, point: point, source: source, isActive: isActive, createdAt: createdAt, updatedAt: updatedAt,
    });

    return pointData;
  }

  findAll() {
    return `This action returns all point`;
  }

  findOne(id: number) {
    return `This action returns a #${id} point`;
  }

  update(id: number, updatePointDto: UpdatePointDto) {
    return `This action updates a #${id} point`;
  }

  remove(id: number) {
    return `This action removes a #${id} point`;
  }
}
