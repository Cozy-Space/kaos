import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { LoginEntity } from './login.entity';
import { UpdatePasswordDto } from './dtos/updatepassword.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private loginRepository: Repository<LoginEntity>,
  ) {
    this.ensureDefaultLogin();
  }

  async ensureDefaultLogin() {
    const hasNoAccount = await this.hasNoAccount();

    if (hasNoAccount)
      this.loginRepository.save({
        name: 'admin',
        password: bcrypt.hashSync('password', 10),
      });
  }

  async hasNoAccount(): Promise<boolean> {
    const loginCount = await this.loginRepository.count();
    return loginCount === 0;
  }

  async updatePassword(
    userId: number,
    passwords: UpdatePasswordDto,
  ): Promise<boolean> {
    const login = await this.loginRepository.findOneBy({ id: userId });

    if (!login) return false;

    if (!bcrypt.compareSync(passwords.oldPassword, login.password))
      return false;

    this.loginRepository.update(
      { id: userId },
      { password: bcrypt.hashSync(passwords.newPassword, 10) },
    );
    return true;
  }

  async verify(credentials: LoginDto): Promise<LoginEntity> {
    const login = await this.loginRepository.findOneBy({
      name: credentials.name,
    });

    if (!login) return null;

    if (!bcrypt.compareSync(credentials.password, login.password)) return null;

    return { name: login.name, id: login.id } as LoginEntity;
  }
}
