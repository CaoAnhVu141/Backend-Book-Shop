import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './auth/core/transform.interceptor';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RolesGuard } from './guard/roles.guard';

async function bootstrap() {

   const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalGuards(new RolesGuard(reflector));

  app.useStaticAssets(join(__dirname, '..', 'public')); //js, css, images
  app.setBaseViewsDir(join(__dirname, '..', 'views')); //view 
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());

  // config cors
  app.enableCors(
    {
      "origin":true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      // credentials: true
      credentials: true
    }
  );

  // config set cookies
  app.use(cookieParser());

  // config version api
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2'] //v1, v2
  });
  await app.listen(configService.get<string>("PORT"));
}
bootstrap();
