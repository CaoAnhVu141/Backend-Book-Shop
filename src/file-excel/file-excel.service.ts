import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFileExcelDto } from './dto/create-file-excel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { genSaltSync, hashSync } from 'bcryptjs';
import XLSX from 'xlsx';


@Injectable()
export class FileExcelService {

  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
  ) { }

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async handleUploadExcel(fileExcelDto: CreateFileExcelDto) {
    try {
      const data = fileExcelDto.data;
      const responseData = [];
      // thực hiện lấy danh sách theo data
      const dataEmail = data.map(user => user.email); //lấy toàn bộ email trong danh sách import
      for (let item of data) {
        const role = await this.roleModel.findOne({ name: item.role });
        if (!role || role.isDeleted) {
          throw new NotFoundException(`Không tìm thấy dữ liệu role`);
        }

        const existingEmail = await this.userModel.find({ email: dataEmail })
        if (existingEmail.length > 0) {
          throw new BadRequestException({
            message: "Email đã tồn tại trong hệ thống",
          });
        }

        const handlePassword = await this.getHashPassword(item.password || "password");
        ///thực hiện push vào danh sách
        responseData.push({
          name: item.name,
          email: item.email,
          password: handlePassword,
          role: role._id,
        });
      }
      return await this.userModel.insertMany(responseData);
    } catch (error) {
      throw new InternalServerErrorException(' ' + error.message);
    }
  }

  // function export file excel
  handleExportExcel = async (array: any[]) => {
    try {
      const users = await this.userModel.find().lean();
      if(!users){
        throw new NotFoundException(`Xin lỗi dữ liệu không tồn tại`);
      }
      
      // handle convert data list to array
       array = users.map(item => ({

        name: item.name,
        email: item.email,
        age: item?.age,
        gender: item?.gender,
        role: item?.role,
        createdAt: item.createdAt,
      }));
      // convert to csv
      const worksheet = XLSX.utils.json_to_sheet(array);
      const fileCsv = XLSX.utils.sheet_to_csv(worksheet);
      return fileCsv;
    } catch (error) {
      throw new InternalServerErrorException(' ' + error.message);
    }
  }
}
