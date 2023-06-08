import { MasterService } from './master.service';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
export declare class MasterController {
    private readonly masterService;
    constructor(masterService: MasterService);
    create(createMasterDto: CreateMasterDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMasterDto: UpdateMasterDto): string;
    remove(id: string): string;
}
