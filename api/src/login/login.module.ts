import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginEntity } from './login.entity';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginEntity])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
