import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PointService } from './point.service';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  @ResponseMessage("Get points success")
  createPointController(@Body() createPointDto: CreatePointDto) {
    return this.pointService.createPointService(createPointDto);
  }

  @Get()
  findAll() {
    return this.pointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePointDto: UpdatePointDto) {
    return this.pointService.update(+id, updatePointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pointService.remove(+id);
  }
}
