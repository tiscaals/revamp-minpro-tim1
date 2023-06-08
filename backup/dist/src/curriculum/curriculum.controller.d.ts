import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
export declare class CurriculumController {
    private readonly curriculumService;
    constructor(curriculumService: CurriculumService);
    create(createCurriculumDto: CreateCurriculumDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCurriculumDto: UpdateCurriculumDto): string;
    remove(id: string): string;
}
