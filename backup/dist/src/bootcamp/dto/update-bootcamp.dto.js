"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBootcampDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bootcamp_dto_1 = require("./create-bootcamp.dto");
class UpdateBootcampDto extends (0, mapped_types_1.PartialType)(create_bootcamp_dto_1.CreateBootcampDto) {
}
exports.UpdateBootcampDto = UpdateBootcampDto;
//# sourceMappingURL=update-bootcamp.dto.js.map