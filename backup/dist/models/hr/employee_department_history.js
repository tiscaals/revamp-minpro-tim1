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
exports.employee_department_history = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let employee_department_history = class employee_department_history extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('hr.employee_department_history_edhi_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({
        name: 'employee_department_history_pkey',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", Number)
], employee_department_history.prototype, "edhi_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({
        name: 'employee_department_history_pkey',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", Number)
], employee_department_history.prototype, "edhi_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], employee_department_history.prototype, "edhi_start_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], employee_department_history.prototype, "edhi_end_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], employee_department_history.prototype, "edhi_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], employee_department_history.prototype, "edhi_dept_id", void 0);
employee_department_history = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'employee_department_history',
        schema: 'hr',
        timestamps: false,
    })
], employee_department_history);
exports.employee_department_history = employee_department_history;
//# sourceMappingURL=employee_department_history.js.map