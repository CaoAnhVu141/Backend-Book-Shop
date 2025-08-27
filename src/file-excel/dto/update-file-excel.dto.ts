import { PartialType } from '@nestjs/mapped-types';
import { CreateFileExcelDto } from './create-file-excel.dto';

export class UpdateFileExcelDto extends PartialType(CreateFileExcelDto) {}
