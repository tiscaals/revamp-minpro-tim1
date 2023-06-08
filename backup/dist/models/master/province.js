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
exports.province = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let province = class province extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('master.province_prov_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'province_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], province.prototype, "prov_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(5) }),
    (0, sequelize_typescript_1.Index)({ name: 'province_prov_code_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], province.prototype, "prov_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(85) }),
    __metadata("design:type", String)
], province.prototype, "prov_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], province.prototype, "prov_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(3) }),
    __metadata("design:type", String)
], province.prototype, "prov_country_code", void 0);
province = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'province', schema: 'master', timestamps: false })
], province);
exports.province = province;
//# sourceMappingURL=province.js.map