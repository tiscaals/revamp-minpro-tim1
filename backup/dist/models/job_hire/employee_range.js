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
exports.employee_range = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let employee_range = class employee_range extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('job_hire.employee_range_emra_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'employee_range_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], employee_range.prototype, "emra_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({
        name: 'employee_range_emra_range_min_key',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", Number)
], employee_range.prototype, "emra_range_min", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({
        name: 'employee_range_emra_range_max_key',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", Number)
], employee_range.prototype, "emra_range_max", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], employee_range.prototype, "emra_modified_date", void 0);
employee_range = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'employee_range', schema: 'job_hire', timestamps: false })
], employee_range);
exports.employee_range = employee_range;
//# sourceMappingURL=employee_range.js.map