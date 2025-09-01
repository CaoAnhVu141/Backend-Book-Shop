import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { FileExcelService } from './file-excel.service';
import { CreateFileExcelDto } from './dto/create-file-excel.dto';
import { Response } from 'express';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('file-excel')
export class FileExcelController {
  constructor(private readonly fileExcelService: FileExcelService) { }

  @Post('import')
  @ResponseMessage("Upload file excel success")
  handUploadExcelController(@Body() fileExcelDto: CreateFileExcelDto) {
    return this.fileExcelService.handleUploadExcel(fileExcelDto);
  }

  @Post('export')
  @ResponseMessage("Export file excel success")
  async handleExportExcelController(@Res() res: Response,array: any[]) {
    const dataExport = await this.fileExcelService.handleExportExcel(array);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.send('\uFEFF' + dataExport);
  }
}
