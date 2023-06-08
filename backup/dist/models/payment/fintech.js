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
exports.fintech = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let fintech = class fintech extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'fintech_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], fintech.prototype, "fint_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(10) }),
    (0, sequelize_typescript_1.Index)({ name: 'fintech_fint_code_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], fintech.prototype, "fint_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(55) }),
    (0, sequelize_typescript_1.Index)({ name: 'fintech_fint_name_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], fintech.prototype, "fint_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], fintech.prototype, "fint_modified_date", void 0);
fintech = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'fintech', schema: 'payment', timestamps: false })
], fintech);
exports.fintech = fintech;
//# sourceMappingURL=fintech.js.map