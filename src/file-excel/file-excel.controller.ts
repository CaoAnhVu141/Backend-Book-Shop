import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileExcelService } from './file-excel.service';
import { CreateFileExcelDto } from './dto/create-file-excel.dto';
import { UpdateFileExcelDto } from './dto/update-file-excel.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('file-excel')
export class FileExcelController {
  constructor(private readonly fileExcelService: FileExcelService) {}

  @Post()
  @ResponseMessage("Upload file excel success")
  handUploadExcelController(@Body() fileExcelDto: CreateFileExcelDto) {
    return this.fileExcelService.handleUploadExcel(fileExcelDto);
  }
}
