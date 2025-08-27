import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileExcelDto } from './dto/create-file-excel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';

@Injectable()
export class FileExcelService {

  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) { }

  async handleUploadExcel(fileExcelDto: CreateFileExcelDto) {
    try {
      const data = fileExcelDto.data;
      console.log("check data: ", data);
      const responseData = [];
      for (let item of data) {
        const role = await this.roleModel.findOne({ name: item.role });
        if(!role || role.isDeleted){
          throw new NotFoundException(`Không tìm thấy dữ liệu role`);
        }
        ///thực hiện push vào danh sách
        responseData.push({
          name: item.name,
          email: item.email,
          password: item.password ?? "password",
          role: role._id,
        });
      }
      return await this.userModel.insertMany(responseData);
    } catch (error) {
      throw new Error('Đã có lỗi khi import dữ liệu: ' + error.message);
    }
  }
}
