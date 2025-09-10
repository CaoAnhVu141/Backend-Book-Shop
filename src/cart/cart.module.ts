import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Book, BookSchema } from 'src/books/schemas/book.schema';
import { UserSchema, User } from 'src/users/schemas/user.schema';
import { Inventory,InventorySchema } from 'src/inventory/schemas/inventory.schema';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema },
  { name: Book.name, schema: BookSchema },
  { name: User.name, schema: UserSchema },
  { name: Inventory.name, schema: InventorySchema }
  ])],
})
export class CartModule { }
