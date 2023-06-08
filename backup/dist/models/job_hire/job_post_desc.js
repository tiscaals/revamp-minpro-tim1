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
exports.job_post_desc = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let job_post_desc = class job_post_desc extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'job_post_desc_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], job_post_desc.prototype, "jopo_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], job_post_desc.prototype, "jopo_description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], job_post_desc.prototype, "jopo_responsibility", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], job_post_desc.prototype, "jopo_target", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], job_post_desc.prototype, "jopo_benefit", void 0);
job_post_desc = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'job_post_desc', schema: 'job_hire', timestamps: false })
], job_post_desc);
exports.job_post_desc = job_post_desc;
//# sourceMappingURL=job_post_desc.js.map