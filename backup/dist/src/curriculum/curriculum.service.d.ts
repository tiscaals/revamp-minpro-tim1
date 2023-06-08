import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
export declare class CurriculumService {
    create(createCurriculumDto: CreateCurriculumDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCurriculumDto: UpdateCurriculumDto): string;
    remove(id: number): string;
}
