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
exports.batch_trainee = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let batch_trainee = class batch_trainee extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('bootcamp.batch_trainee_batr_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'batch_trainee_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], batch_trainee.prototype, "batr_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], batch_trainee.prototype, "batr_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(1) }),
    __metadata("design:type", String)
], batch_trainee.prototype, "batr_certificated", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], batch_trainee.prototype, "batr_certificate_link", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], batch_trainee.prototype, "batr_access_token", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(1) }),
    __metadata("design:type", String)
], batch_trainee.prototype, "batr_access_grant", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(1024) }),
    __metadata("design:type", String)
], batch_trainee.prototype, "batr_review", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], batch_trainee.prototype, "batr_total_score", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], batch_trainee.prototype, "batr_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], batch_trainee.prototype, "batr_trainee_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'batch_trainee_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], batch_trainee.prototype, "batr_batch_id", void 0);
batch_trainee = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'batch_trainee', schema: 'bootcamp', timestamps: false })
], batch_trainee);
exports.batch_trainee = batch_trainee;
//# sourceMappingURL=batch_trainee.js.map