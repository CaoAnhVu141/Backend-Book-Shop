import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Point, PointSchema } from './schemas/point.schema';

@Module({
  controllers: [PointController],
  providers: [PointService],
  imports: [MongooseModule.forFeature([{ name: Point.name, schema: PointSchema }])],
})
export class PointModule {}
