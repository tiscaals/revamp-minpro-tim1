import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
export declare class PlacementService {
    create(createPlacementDto: CreatePlacementDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePlacementDto: UpdatePlacementDto): string;
    remove(id: number): string;
}
