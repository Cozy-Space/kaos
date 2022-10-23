import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { StatusDto } from './dtos/status.dto';
import { SuccessDto } from './dtos/success.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(
    @Body() body: LoginDto,
    @Session() session: any,
  ): Promise<SuccessDto> {
    const success = await this.loginService.verify(body);
    console.log(session);
    session.authenicated = success;
    console.log(success);
    return { success };
  }

  @Post('/create')
  async create(@Body() body: LoginDto) {
    return this.loginService.createAccount(body);
  }

  @Get('status')
  async status(): Promise<StatusDto> {
    return { status: !(await this.loginService.hasNoAccount()) };
  }
}
