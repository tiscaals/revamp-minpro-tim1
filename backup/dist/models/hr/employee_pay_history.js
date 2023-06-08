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
exports.employee_pay_history = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let employee_pay_history = class employee_pay_history extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'employee_pay_history_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], employee_pay_history.prototype, "ephi_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING }),
    (0, sequelize_typescript_1.Index)({ name: 'employee_pay_history_pkey', using: 'btree', unique: true }),
    __metadata("design:type", String)
], employee_pay_history.prototype, "ephi_rate_change_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], employee_pay_history.prototype, "ephi_rate_salary", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], employee_pay_history.prototype, "ephi_pay_frequence", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], employee_pay_history.prototype, "ephi_modified_date", void 0);
employee_pay_history = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'employee_pay_history', schema: 'hr', timestamps: false })
], employee_pay_history);
exports.employee_pay_history = employee_pay_history;
//# sourceMappingURL=employee_pay_history.js.map