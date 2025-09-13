import { Injectable } from '@nestjs/common';
import { CreateStatisticalDto } from './dto/create-statistical.dto';
import { UpdateStatisticalDto } from './dto/update-statistical.dto';

@Injectable()
export class StatisticalService {
  create(createStatisticalDto: CreateStatisticalDto) {
    return 'This action adds a new statistical';
  }

  findAll() {
    return `This action returns all statistical`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statistical`;
  }

  update(id: number, updateStatisticalDto: UpdateStatisticalDto) {
    return `This action updates a #${id} statistical`;
  }

  remove(id: number) {
    return `This action removes a #${id} statistical`;
  }
}
