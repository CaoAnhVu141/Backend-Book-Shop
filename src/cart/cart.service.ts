import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Book, BookDocument } from 'src/books/schemas/book.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Inventory, InventoryDocument } from 'src/inventory/schemas/inventory.schema';

@Injectable()
export class CartService {

  constructor(
    @InjectModel(Cart.name)
    private cartModule: SoftDeleteModel<CartDocument>,

    @InjectModel(Book.name)
    private bookModule: SoftDeleteModel<BookDocument>,

    @InjectModel(User.name)
    private userModule: SoftDeleteModel<UserDocument>,

    @InjectModel(Inventory.name)
    private inventoryModule: SoftDeleteModel<InventoryDocument>,
  ) { }

  async addToCartService(createCartDto: CreateCartDto) {
    const {user, book: bookName, quantity, price, discount} = createCartDto;

    const dataBook = await this.bookModule.findOne({name: bookName});
    if(!dataBook || dataBook.isDeleted){
      throw new BadRequestException("Dữ liệu sách không tồn tại");
    }

    // check quantity in inventory
    const dataInventory = await this.inventoryModule.findOne({book: dataBook._id});
    if (!dataInventory || dataInventory.quantity < quantity) {
    throw new BadRequestException("Số lượng sách trong kho không đủ");
  }

    const calculatedTotalPrice = price * quantity * (1 - discount / 100);

    const cart = await this.cartModule.create({
      user, book: dataBook._id, quantity, price, discount, totalPrice: calculatedTotalPrice
    });
    return cart;
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
