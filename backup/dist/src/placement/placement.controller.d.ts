import { PlacementService } from './placement.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
export declare class PlacementController {
    private readonly placementService;
    constructor(placementService: PlacementService);
    create(createPlacementDto: CreatePlacementDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePlacementDto: UpdatePlacementDto): string;
    remove(id: string): string;
}
