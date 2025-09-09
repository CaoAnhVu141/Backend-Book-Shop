import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory,InventorySchema } from './schemas/inventory.schema';
import { Book, BookSchema } from 'src/books/schemas/book.schema';
import { Warehouse, WarehouseSchema } from 'src/warehouse/schemas/warehouse.schema';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [MongooseModule.forFeature([{ name: Inventory.name, schema: InventorySchema },
    {name: Book.name, schema: BookSchema},
    {name: Warehouse.name, schema: WarehouseSchema}
  ])],
})
export class InventoryModule {}
