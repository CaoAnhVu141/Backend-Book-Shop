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

    AuthModule, UsersModule, FilesModule, BooksModule, CategoriesModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService,
  //   {
  //   // provide: APP_GUARD,
  //   // useClass: JwtAuthGuard,
  // },
  ],
})
export class AppModule { }
