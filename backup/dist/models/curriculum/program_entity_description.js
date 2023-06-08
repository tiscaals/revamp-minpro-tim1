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
exports.program_entity_description = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let program_entity_description = class program_entity_description extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({
        name: 'program_entity_description_pkey',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", Number)
], program_entity_description.prototype, "pred_prog_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], program_entity_description.prototype, "pred_item_learning", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], program_entity_description.prototype, "pred_item_include", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], program_entity_description.prototype, "pred_requirement", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], program_entity_description.prototype, "pred_description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], program_entity_description.prototype, "pred_target_level", void 0);
program_entity_description = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'program_entity_description',
        schema: 'curriculum',
        timestamps: false,
    })
], program_entity_description);
exports.program_entity_description = program_entity_description;
//# sourceMappingURL=program_entity_description.js.map