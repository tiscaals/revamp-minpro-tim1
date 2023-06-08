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
exports.job_role = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let job_role = class job_role extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('master.job_role_joro_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'job_role_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], job_role.prototype, "joro_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(55) }),
    (0, sequelize_typescript_1.Index)({ name: 'job_role_joro_name_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], job_role.prototype, "joro_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], job_role.prototype, "joro_modified_date", void 0);
job_role = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'job_role', schema: 'master', timestamps: false })
], job_role);
exports.job_role = job_role;
//# sourceMappingURL=job_role.js.map