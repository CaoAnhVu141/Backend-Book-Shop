import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @ResponseMessage("Create warehouse success")
  createWareHouseController(@Body() createWarehouseDto: CreateWarehouseDto, @User() user: IUser) {
    return this.warehouseService.createWareHouseService(createWarehouseDto, user);
  }

  @Get()
  @ResponseMessage("Fetch all warehouse success")
  getAllWareHouseController(@Query("current") currentPage: string,
      @Query("pageSize") limit: string,
      @Query() qs: string) {
    return this.warehouseService.getAllWareHouseService(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.update(+id, updateWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
