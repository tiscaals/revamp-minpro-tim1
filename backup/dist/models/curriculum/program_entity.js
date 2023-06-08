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
exports.program_entity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let program_entity = class program_entity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('curriculum.program_entity_prog_entity_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'program_entity_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], program_entity.prototype, "prog_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(256) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(512) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_headline", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_learning_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_rating", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], program_entity.prototype, "prog_total_trainee", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(256) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(1) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_best_seller", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(35) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_language", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], program_entity.prototype, "prog_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], program_entity.prototype, "prog_duration", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_duration_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(512) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_tag_skill", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], program_entity.prototype, "prog_city_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], program_entity.prototype, "prog_cate_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], program_entity.prototype, "prog_created_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], program_entity.prototype, "prog_status", void 0);
program_entity = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'program_entity', schema: 'curriculum', timestamps: false })
], program_entity);
exports.program_entity = program_entity;
//# sourceMappingURL=program_entity.js.map