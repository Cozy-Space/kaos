import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from './container/container.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { relative, join } from "path";
import {ContainerEntity} from "./container/container.entity";
import { LocationModule } from './location/location.module';
import {LocationEntity} from "./location/location.entity";
import { BackupModule } from './backup/backup.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ContainerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(relative('', '.'), 'database.sqlite'),
      logging: true,
      synchronize: true,
      entities: [ContainerEntity, LocationEntity]
    }),
    LocationModule,
    BackupModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
