import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MasterModule } from './master/master.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { PlacementModule } from './placement/placement.module';
import { JobHireModule } from './job-hire/job-hire.module';
import { SalesModule } from './sales/sales.module';
import { PaymentModule } from './payment/payment.module';
import { BootcampModule } from './bootcamp/bootcamp.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, BootcampModule, PaymentModule, SalesModule, JobHireModule, PlacementModule, CurriculumModule, MasterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
