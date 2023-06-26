import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterModule } from './master/master.module';
import { PlacementModule } from './placement/placement.module';
import { JobHireModule } from './job-hire/job-hire.module';
// import { SalesModule } from './sales/sales.module';
import { BankModule } from './payment/bank/bank.module';
import { FintechModule } from './payment/fintech/fintech.module';
import { TransactionPaymentModule } from './payment/transaction_payment/transaction_payment.module';
import { UsersAccountModule } from './payment/users_account/users_account.module';
import { BootcampModule } from './bootcamp/bootcamp.module';
// import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ApplyBootcampModule } from './users/apply-bootcamp/applyBootcamp.module';
import { ApplyJobModule } from './users/apply-job/applyJob.module';
import { EducationModule } from './users/education/education.module';
import { EmailModule } from './users/email/email.module';
import { ExperiencesModule } from './users/experiences/experiences.module';
import { PhoneModule } from './users/phone-number/phone.module';
import { ProfileModule } from './users/profile/profile.module';
import { SkillsModule } from './users/skills/skills.module';
import { ProfileAddressModule } from './users/address/address.module';
import { SalesModule } from './sales/sales.module';
import { CurriculumModule } from './curriculum/program_entity/curriculum.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
      rootPath: join(__dirname, '..', 'images'), // Sesuaikan dengan path ke folder gambar
      },
      {
        rootPath: join(__dirname, '..', 'images/user-image'), //For User
      },
      {
        rootPath: join(__dirname, '..', 'files/user-media'), //For User
      },
      {
        rootPath: join(__dirname, '..', 'files/curriculum-media'), //For Curriculum
      },
      {
        rootPath: join(__dirname, '..', 'images/curriculum-images'), //For Curriculum
      },
      {
        rootPath: join(__dirname, '..', 'videos/curriculum-videos'), //For Curriculum
      },
    ),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: 'localhost',
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        models: [],
        autoLoadModels: true,
      }),
    }),
    MasterModule,
    UsersModule,
    BootcampModule, 
    BankModule,
    FintechModule,
    TransactionPaymentModule,
    UsersAccountModule,
    JobHireModule, 
    PlacementModule, 
    CurriculumModule, 

    // Start Users Module
    AuthModule,
    ProfileAddressModule,
    ProfileModule,
    EmailModule,
    PhoneModule,
    EducationModule,
    ExperiencesModule,
    SkillsModule,
    ApplyJobModule,
    ApplyBootcampModule,
    //End

    SalesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
