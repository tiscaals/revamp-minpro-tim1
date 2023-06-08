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
exports.roles = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let roles = class roles extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('users.roles_role_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'roles_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], roles.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(35) }),
    (0, sequelize_typescript_1.Index)({ name: 'roles_role_name_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], roles.prototype, "role_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], roles.prototype, "role_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], roles.prototype, "role_modified_date", void 0);
roles = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'roles', schema: 'users', timestamps: false })
], roles);
exports.roles = roles;
//# sourceMappingURL=roles.js.map