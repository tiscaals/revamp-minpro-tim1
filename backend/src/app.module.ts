import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterModule } from './master/master.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { PlacementModule } from './placement/placement.module';
import { JobHireModule } from './job-hire/job-hire.module';
import { SalesModule } from './sales/sales.module';
import { PaymentModule } from './payment/payment.module';
import { BootcampModule } from './bootcamp/bootcamp.module';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: 'postgres',
        database: "minpro",
        models: [],
        autoLoadModels: true,
      })
    }),
    UsersModule, 
    BootcampModule, 
    PaymentModule, 
    SalesModule, 
    JobHireModule, 
    PlacementModule, 
    CurriculumModule, 
    MasterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
