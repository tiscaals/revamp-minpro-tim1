"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobHireService = void 0;
const common_1 = require("@nestjs/common");
const job_hire_1 = require("../../models/job_hire");
const sequelize_typescript_1 = require("sequelize-typescript");
let JobHireService = class JobHireService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    create(createJobHireDto) {
        return 'This action adds a new jobHire';
    }
    findAll() {
        try {
            const result = job_hire_1.job_post.findAll();
            return { result: result, hasil: `Ini hasilnya` };
        }
        catch (error) {
            return error.message;
        }
    }
    findOne(id) {
        return `This action returns a #${id} jobHire`;
    }
    update(id, updateJobHireDto) {
        return `This action updates a #${id} jobHire`;
    }
    remove(id) {
        return `This action removes a #${id} jobHire`;
    }
};
JobHireService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize])
], JobHireService);
exports.JobHireService = JobHireService;
//# sourceMappingURL=job-hire.service.js.map