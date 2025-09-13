import { Module } from '@nestjs/common';
import { StatisticalService } from './statistical.service';
import { StatisticalController } from './statistical.controller';

@Module({
  controllers: [StatisticalController],
  providers: [StatisticalService]
})
export class StatisticalModule {}
