import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from 'src/login.guard';
import { LoginDto } from './dtos/login.dto';
import { StatusDto } from './dtos/status.dto';
import { SuccessDto } from './dtos/success.dto';
import { LoginService } from './login.service';

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(
    @Body() body: LoginDto,
    @Session() session: any,
    @Res() res: Response,
  ) {
    await wait(1000);
    if (!body || !body.name || !body.password) {
      res.sendStatus(401);
      return;
    }

    const login = await this.loginService.verify(body);
    if (!login) {
      res.sendStatus(401);
      return;
    }
    session.user = login;
    res.sendStatus(204);
  }

  @Get('logout')
  @HttpCode(204)
  async logout(@Session() session: any) {
    session.destroy();
  }

  @Get('me')
  @UseGuards(LoginGuard)
  async me(@Session() session: any): Promise<LoginDto> {
    return session.user;
  }
}
