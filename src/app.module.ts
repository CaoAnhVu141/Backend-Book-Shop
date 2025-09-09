import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { APP_GUARD } from '@nestjs/core';
import { FilesModule } from './files/files.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderHistoryModule } from './order-history/order-history.module';
import { FavoriteModule } from './favorite/favorite.module';
import { RolesModule } from './roles/roles.module';
import { FileExcelModule } from './file-excel/file-excel.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReviewModule } from './review/review.module';
import { PaymentModule } from './payment/payment.module';
import { CouponModule } from './coupon/coupon.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }

      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),

    AuthModule, UsersModule, FilesModule, BooksModule, CategoriesModule, AuthorsModule, OrdersModule, OrderItemsModule, OrderHistoryModule, FavoriteModule, RolesModule, FileExcelModule, WarehouseModule, InventoryModule, ReviewModule, PaymentModule, CouponModule, CartModule],
  controllers: [AppController],
  providers: [AppService,
  //   {
  //   // provide: APP_GUARD,
  //   // useClass: JwtAuthGuard,
  // },
  ],
})
export class AppModule { }
