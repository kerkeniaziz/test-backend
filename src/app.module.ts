import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PocketsModule } from './pockets/pockets.module';
import { SubPocketsModule } from './sub-pockets/sub-pockets.module';
import { NoteModule } from './note/note.module';
import { ConditionModule } from './condition/condition.module';
import { ConditionModule } from './condition/condition.module';

@Module({
  imports: [UserModule,    
    ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true,
    cache: false,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: parseInt(<string>configService.get('DB_PORT'), 10),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), 
    inject: [ConfigService],
  }),
  PocketsModule,
  SubPocketsModule,
  NoteModule,
  ConditionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
