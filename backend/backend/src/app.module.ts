import { Module } from '@nestjs/common';
import { ProgramEntityModule } from './program_entity/program_entity.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProgramReviewsDtoModule } from './program-reviews-dto/program-reviews-dto.module';
import { MasterModule } from './master/master.module';
import { UsersDtoModule } from './users-dto/users-dto.module';
import { HrDtoModule } from './hr-dto/hr-dto.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        schema: process.env.SCHEMA,
        models: [],

        autoLoadModels: true,
      }),
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'image'),
      },
      {
        rootPath: join(__dirname, '..', 'files/halo'),
      },
      {
        rootPath: join(__dirname, '..', 'videos'),
      },
      {
        rootPath: join(__dirname, '..', 'user_photo'),
      },
    ),
    ProgramEntityModule,
    ProgramReviewsDtoModule,
    MasterModule,
    UsersDtoModule,
    HrDtoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
