"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobHireModule = void 0;
const common_1 = require("@nestjs/common");
const job_hire_service_1 = require("./job-hire.service");
const job_hire_controller_1 = require("./job-hire.controller");
const sequelize_1 = require("@nestjs/sequelize");
const job_hire_1 = require("../../models/job_hire");
let JobHireModule = class JobHireModule {
};
JobHireModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([job_hire_1.job_category, job_hire_1.job_photo, job_hire_1.job_post, job_hire_1.job_post_desc])],
        controllers: [job_hire_controller_1.JobHireController],
        providers: [job_hire_service_1.JobHireService]
    })
], JobHireModule);
exports.JobHireModule = JobHireModule;
//# sourceMappingURL=job-hire.module.js.map