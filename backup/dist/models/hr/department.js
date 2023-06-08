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
exports.department = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let department = class department extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('hr.department_dept_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'department_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], department.prototype, "dept_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(50) }),
    (0, sequelize_typescript_1.Index)({ name: 'department_dept_name_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], department.prototype, "dept_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], department.prototype, "dept_modified_date", void 0);
department = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'department', schema: 'hr', timestamps: false })
], department);
exports.department = department;
//# sourceMappingURL=department.js.map