import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
