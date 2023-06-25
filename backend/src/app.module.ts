import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
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
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './users/address/address.module';
import { ProfileModule } from './users/profile/profile.module';
import { EmailModule } from './users/email/email.module';
import { PhoneModule } from './users/phone-number/phone.module';
import { EducationModule } from './users/education/education.module';
import { ExperiencesModule } from './users/experiences/experiences.module';
import { SkillsModule } from './users/skills/skills.module';
import { ApplyJobModule } from './users/apply-job/applyJob.module';
import { join } from 'path';
import { ApplyBootcampModule } from './users/apply-bootcamp/applyBootcamp.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'images/user-image'),
      },
      {
        rootPath: join(__dirname, '..', 'files/user-media'),
      },
    ),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        models: [],
        autoLoadModels: true,
      }),
    }),
    UsersModule,
    BootcampModule,
    PaymentModule,
    SalesModule,
    JobHireModule,
    PlacementModule,
    CurriculumModule,
    MasterModule,
    AuthModule,
    AddressModule,
    ProfileModule,
    EmailModule,
    PhoneModule,
    EducationModule,
    ExperiencesModule,
    SkillsModule,
    ApplyJobModule,
    ApplyBootcampModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
