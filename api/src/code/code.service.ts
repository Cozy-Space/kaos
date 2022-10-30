import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeEntity } from './code.entity';

@Injectable()
export class CodeService {
  constructor(
    @InjectRepository(CodeEntity)
    private codeRepository: Repository<CodeEntity>,
  ) {}

  async generateKeys(): Promise<string[]> {
    const codes = [];

    for (let i = 0; i < 14; i++) {
      const code = await this.codeRepository.save({});
      codes.push(leadingZero(code.id, 6));
    }
    return codes;
  }
}

const leadingZero = (value: number, length: number) => {
  let valueS = value.toString();
  while (valueS.length < length) valueS = `0${valueS}`;
  return valueS;
};
