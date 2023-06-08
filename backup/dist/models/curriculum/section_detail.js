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
exports.section_detail = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let section_detail = class section_detail extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('curriculum.section_detail_secd_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'section_detail_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], section_detail.prototype, "secd_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(256) }),
    __metadata("design:type", String)
], section_detail.prototype, "secd_title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(1) }),
    __metadata("design:type", String)
], section_detail.prototype, "secd_preview", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], section_detail.prototype, "secd_score", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(256) }),
    __metadata("design:type", String)
], section_detail.prototype, "secd_note", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], section_detail.prototype, "secd_minute", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], section_detail.prototype, "secd_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], section_detail.prototype, "secd_sect_id", void 0);
section_detail = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'section_detail', schema: 'curriculum', timestamps: false })
], section_detail);
exports.section_detail = section_detail;
//# sourceMappingURL=section_detail.js.map