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
exports.talent_apply_progress = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let talent_apply_progress = class talent_apply_progress extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('job_hire.talent_apply_progress_tapr_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'talent_apply_progress_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], talent_apply_progress.prototype, "tapr_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'talent_apply_progress_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], talent_apply_progress.prototype, "tapr_taap_user_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'talent_apply_progress_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], talent_apply_progress.prototype, "tapr_taap_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], talent_apply_progress.prototype, "tapr_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], talent_apply_progress.prototype, "tapr_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(256) }),
    __metadata("design:type", String)
], talent_apply_progress.prototype, "tapr_comment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(55) }),
    __metadata("design:type", String)
], talent_apply_progress.prototype, "tapr_progress_name", void 0);
talent_apply_progress = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'talent_apply_progress',
        schema: 'job_hire',
        timestamps: false,
    })
], talent_apply_progress);
exports.talent_apply_progress = talent_apply_progress;
//# sourceMappingURL=talent_apply_progress.js.map