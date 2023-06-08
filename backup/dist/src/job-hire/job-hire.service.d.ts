import { CreateJobHireDto } from './dto/create-job-hire.dto';
import { UpdateJobHireDto } from './dto/update-job-hire.dto';
import { Sequelize } from 'sequelize-typescript';
export declare class JobHireService {
    private sequelize;
    constructor(sequelize: Sequelize);
    create(createJobHireDto: CreateJobHireDto): string;
    findAll(): any;
    findOne(id: number): string;
    update(id: number, updateJobHireDto: UpdateJobHireDto): string;
    remove(id: number): string;
}
