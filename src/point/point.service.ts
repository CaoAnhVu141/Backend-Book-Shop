import { Injectable } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Point, PointDocument } from './schemas/point.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class PointService {

  constructor(
    @InjectModel(Point.name)
    private pointModule: SoftDeleteModel<PointDocument>
  ) { }

  create(createPointDto: CreatePointDto) {
    return 'This action adds a new point';
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
