"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlacementDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_placement_dto_1 = require("./create-placement.dto");
class UpdatePlacementDto extends (0, mapped_types_1.PartialType)(create_placement_dto_1.CreatePlacementDto) {
}
exports.UpdatePlacementDto = UpdatePlacementDto;
//# sourceMappingURL=update-placement.dto.js.map