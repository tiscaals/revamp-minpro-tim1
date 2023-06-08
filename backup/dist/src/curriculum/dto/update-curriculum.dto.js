"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCurriculumDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_curriculum_dto_1 = require("./create-curriculum.dto");
class UpdateCurriculumDto extends (0, mapped_types_1.PartialType)(create_curriculum_dto_1.CreateCurriculumDto) {
}
exports.UpdateCurriculumDto = UpdateCurriculumDto;
//# sourceMappingURL=update-curriculum.dto.js.map