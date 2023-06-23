import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
@Module({
  imports: [SequelizeModule.forFeature([])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
