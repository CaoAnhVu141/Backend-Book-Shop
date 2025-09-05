import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [
      MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }]),
    ]
})
export class WarehouseModule {}
