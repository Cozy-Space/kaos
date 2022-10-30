import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainerModule } from './container/container.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ContainerEntity } from './container/container.entity';
import { LocationModule } from './location/location.module';
import { LocationEntity } from './location/location.entity';
import { BackupModule } from './backup/backup.module';
import { ImageModule } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoginModule } from './login/login.module';
import { LoginEntity } from './login/login.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CodeModule } from './code/code.module';
import { CodeEntity } from './code/code.entity';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 3,
    }),
    ContainerModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(process.cwd(), 'database', 'database.sqlite'),
      logging: true,
      synchronize: true,
      entities: [ContainerEntity, LocationEntity, LoginEntity, CodeEntity],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static'),
    }),
    LocationModule,
    BackupModule,
    ImageModule,
    LoginModule,
    CodeModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
