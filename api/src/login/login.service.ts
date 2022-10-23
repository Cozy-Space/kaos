import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { SuccessDto } from './dtos/success.dto';
import { LoginEntity } from './login.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private loginRepository: Repository<LoginEntity>,
  ) {}

  async hasNoAccount(): Promise<boolean> {
    console.log(await this.loginRepository.count());
    return (await this.loginRepository.count()) === 0;
  }

  async createAccount(credentials: LoginDto) {
    if (!(await this.hasNoAccount())) return;
    this.loginRepository.save(credentials);
  }

  async verify(credentials: LoginDto): Promise<boolean> {
    return (
      (await this.loginRepository.countBy({
        name: credentials.name,
        password: credentials.password,
      })) !== 0
    );
  }
}
