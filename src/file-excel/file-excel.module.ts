import { Module } from '@nestjs/common';
import { FileExcelService } from './file-excel.service';
import { FileExcelController } from './file-excel.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/files/multer.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema,User } from 'src/users/schemas/user.schema';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';

@Module({
  controllers: [FileExcelController],
  providers: [FileExcelService],
  imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Role.name, schema: RoleSchema },]),
    ]
})
export class FileExcelModule {}
