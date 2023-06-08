"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobHireDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_job_hire_dto_1 = require("./create-job-hire.dto");
class UpdateJobHireDto extends (0, mapped_types_1.PartialType)(create_job_hire_dto_1.CreateJobHireDto) {
}
exports.UpdateJobHireDto = UpdateJobHireDto;
//# sourceMappingURL=update-job-hire.dto.js.map