"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculumService = void 0;
const common_1 = require("@nestjs/common");
let CurriculumService = class CurriculumService {
    create(createCurriculumDto) {
        return 'This action adds a new curriculum';
    }
    findAll() {
        return `This action returns all curriculum`;
    }
    findOne(id) {
        return `This action returns a #${id} curriculum`;
    }
    update(id, updateCurriculumDto) {
        return `This action updates a #${id} curriculum`;
    }
    remove(id) {
        return `This action removes a #${id} curriculum`;
    }
};
CurriculumService = __decorate([
    (0, common_1.Injectable)()
], CurriculumService);
exports.CurriculumService = CurriculumService;
//# sourceMappingURL=curriculum.service.js.map