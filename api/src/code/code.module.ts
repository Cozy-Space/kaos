import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeController } from './code.controller';
import { CodeEntity } from './code.entity';
import { CodeService } from './code.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodeEntity])],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
