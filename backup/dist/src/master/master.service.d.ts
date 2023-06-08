import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
export declare class MasterService {
    create(createMasterDto: CreateMasterDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMasterDto: UpdateMasterDto): string;
    remove(id: number): string;
}
