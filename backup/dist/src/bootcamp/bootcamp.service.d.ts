import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { Sequelize } from 'sequelize-typescript';
export declare class BootcampService {
    private sequelize;
    constructor(sequelize: Sequelize);
    create(body: any): Promise<{
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
    findOne(id: number): Promise<{
        status: number;
        message: string;
        data: unknown[];
    } | {
        status: number;
        message: any;
        data?: undefined;
    }>;
    update(id: number, body: any): Promise<any>;
    changeStatus(id: number, status: any): Promise<{
        status: number;
        message: string;
        data: unknown[];
    } | {
        status: number;
        message: any;
        data?: undefined;
    }>;
    remove(id: number): Promise<any>;
    createEvaluation(body: CreateBootcampDto): Promise<any>;
}
