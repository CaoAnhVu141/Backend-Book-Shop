import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  @ResponseMessage("Create inventory success")
  createInventoryController(@Body() createInventoryDto: CreateInventoryDto, @User() user: IUser) {
    return this.inventoryService.createInventoryService(createInventoryDto, user);
  }

  @Get()
  @ResponseMessage("Fetch list inventory success")
  getAllInventoryController(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string) {
    return this.inventoryService.getAllInventoryService(+currentPage, +limit, qs);
  }

  @Get(':id')
  findOneInventoryController(@Param('id') id: string) {
    return this.inventoryService.findOneInventoryService(id);
  }

  @Patch(':id')
  @ResponseMessage("Update inventory success")
  updateInventoryController(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto, @User() user: IUser) {
    return this.inventoryService.updateInventoryService(id, updateInventoryDto, user);
  }

  @Delete(':id')
  @ResponseMessage("Delete inventory success")
  removeInventoryController(@Param('id') id: string, @User() user: IUser) {
    return this.inventoryService.removeInventoryService(id,user);
  }
}
