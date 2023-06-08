import { JobHireService } from './job-hire.service';
import { CreateJobHireDto } from './dto/create-job-hire.dto';
import { UpdateJobHireDto } from './dto/update-job-hire.dto';
export declare class JobHireController {
    private readonly jobHireService;
    constructor(jobHireService: JobHireService);
    create(createJobHireDto: CreateJobHireDto): string;
    findAll(): any;
    findOne(id: string): string;
    update(id: string, updateJobHireDto: UpdateJobHireDto): string;
    remove(id: string): string;
}
