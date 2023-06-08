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
exports.section_detail_material = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let section_detail_material = class section_detail_material extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('curriculum.section_detail_material_sedm_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'section_detail_material_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], section_detail_material.prototype, "sedm_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(55) }),
    __metadata("design:type", String)
], section_detail_material.prototype, "sedm_filename", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], section_detail_material.prototype, "sedm_filesize", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], section_detail_material.prototype, "sedm_filetype", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], section_detail_material.prototype, "sedm_filelink", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], section_detail_material.prototype, "sedm_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        autoIncrement: true,
        allowNull: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('curriculum.section_detail_material_sedm_secd_id_seq'::regclass)"),
    }),
    __metadata("design:type", Number)
], section_detail_material.prototype, "sedm_secd_id", void 0);
section_detail_material = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'section_detail_material',
        schema: 'curriculum',
        timestamps: false,
    })
], section_detail_material);
exports.section_detail_material = section_detail_material;
//# sourceMappingURL=section_detail_material.js.map