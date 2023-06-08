"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSaleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sale_dto_1 = require("./create-sale.dto");
class UpdateSaleDto extends (0, mapped_types_1.PartialType)(create_sale_dto_1.CreateSaleDto) {
}
exports.UpdateSaleDto = UpdateSaleDto;
//# sourceMappingURL=update-sale.dto.js.map