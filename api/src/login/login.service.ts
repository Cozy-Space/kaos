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
    const loginCount = await this.loginRepository.count();
    return loginCount === 0;
  }

  async createAccount(credentials: LoginDto) {
    const noAccountYet = await this.hasNoAccount();

    if (!noAccountYet) return;

    this.loginRepository.save(credentials);
  }

  async verify(credentials: LoginDto): Promise<LoginEntity> {
    const login = await this.loginRepository.findOneBy({
      name: credentials.name,
    });

    if (login.password !== credentials.password) return null;

    return { name: login.name, id: login.id } as LoginEntity;
  }
}
