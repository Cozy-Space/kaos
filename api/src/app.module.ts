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
import { ConfigModule } from '@nestjs/config';
import { SmartlistModule } from './smartlist/smartlist.module';
import { SmartListEntity } from './smartlist/smartlist.entity';

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
      entities: [
        ContainerEntity,
        LocationEntity,
        LoginEntity,
        CodeEntity,
        SmartListEntity,
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static'),
    }),
    ConfigModule.forRoot(),
    LocationModule,
    BackupModule,
    ImageModule,
    LoginModule,
    CodeModule,
    SmartlistModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
