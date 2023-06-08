import { BootcampService } from './bootcamp.service';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
export declare class BootcampController {
    private readonly bootcampService;
    constructor(bootcampService: BootcampService);
    create(createBootcampDto: any): Promise<{
        status: number;
        message: any;
    }>;
    findAll(): Promise<{
        message: string;
        data: unknown[];
        status?: undefined;
    } | {
        status: number;
        message: any;
        data?: undefined;
    }>;
    findOne(id: string): Promise<{
        status: number;
        message: string;
        data: unknown[];
    } | {
        status: number;
        message: any;
        data?: undefined;
    }>;
    update(id: string, updateBootcampDto: UpdateBootcampDto): Promise<any>;
    changeStatus(id: string, status: string): Promise<{
        status: number;
        message: string;
        data: unknown[];
    } | {
        status: number;
        message: any;
        data?: undefined;
    }>;
    createEvaluationWeek(body: CreateBootcampDto): Promise<any>;
}
