import { Controller, Get, UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { LoginGuard } from 'src/login.guard';
import { CodeService } from './code.service';

@Controller('code')
@UseGuards(LoginGuard)
export class CodeController {
  constructor(private codeService: CodeService) {}

  @Get()
  @SkipThrottle()
  async generate(): Promise<string[]> {
    return this.codeService.generateKeys();
  }
}
