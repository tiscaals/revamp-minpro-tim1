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
exports.program_apply_progress = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let program_apply_progress = class program_apply_progress extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('bootcamp.program_apply_progress_parog_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'program_apply_progress_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], program_apply_progress.prototype, "parog_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'program_apply_progress_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], program_apply_progress.prototype, "parog_user_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'program_apply_progress_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], program_apply_progress.prototype, "parog_prog_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], program_apply_progress.prototype, "parog_action_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], program_apply_progress.prototype, "parog_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(512) }),
    __metadata("design:type", String)
], program_apply_progress.prototype, "parog_comment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], program_apply_progress.prototype, "parog_progress_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], program_apply_progress.prototype, "parog_emp_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], program_apply_progress.prototype, "parog_status", void 0);
program_apply_progress = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'program_apply_progress',
        schema: 'bootcamp',
        timestamps: false,
    })
], program_apply_progress);
exports.program_apply_progress = program_apply_progress;
//# sourceMappingURL=program_apply_progress.js.map