import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
export declare class SalesService {
    create(createSaleDto: CreateSaleDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSaleDto: UpdateSaleDto): string;
    remove(id: number): string;
}
