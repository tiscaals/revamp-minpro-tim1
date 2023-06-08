"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMasterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_master_dto_1 = require("./create-master.dto");
class UpdateMasterDto extends (0, mapped_types_1.PartialType)(create_master_dto_1.CreateMasterDto) {
}
exports.UpdateMasterDto = UpdateMasterDto;
//# sourceMappingURL=update-master.dto.js.map