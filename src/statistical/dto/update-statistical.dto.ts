import { PartialType } from '@nestjs/mapped-types';
import { CreateStatisticalDto } from './create-statistical.dto';

export class UpdateStatisticalDto extends PartialType(CreateStatisticalDto) {}
