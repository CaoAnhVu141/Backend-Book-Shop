import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';


@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("Login success")
  @Post('/login')
  handleLogin(@Req() req,@Res({ passthrough: true }) response: Response) {
    return this.authService.loginData(req.user,response);
  }

  @Public()
  @ResponseMessage("Register success")
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto){
      return this.authService.registerAuthService(registerUserDto);
  }

  @Public()
//   @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('/account')
  handleAccount(@User() user: IUser)
  {
    return {user};
  }

  @Public()
  @Get('/refresh_token')
  @ResponseMessage("Get refresh token success")
  handleGetRefreshToken(@Req() request: Request,@Res({ passthrough: true }) response: Response){
      const refreshToken = request.cookies["refresh_token"];
      return this.authService.processNewToken(refreshToken,response);
  }


  @Post("/logout")
  @ResponseMessage("Logout success")
  handleLogoutController(@Res({ passthrough: true }) response: Response, @User() user: IUser){
      return this.authService.logoutService(response,user);
  }
}
