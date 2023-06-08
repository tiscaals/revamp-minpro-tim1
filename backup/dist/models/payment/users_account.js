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
exports.users_account = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let users_account = class users_account extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'users_account_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], users_account.prototype, "usac_bank_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], users_account.prototype, "usac_fint_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'users_account_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], users_account.prototype, "usac_user_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(25) }),
    (0, sequelize_typescript_1.Index)({
        name: 'users_account_usac_account_number_key',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", String)
], users_account.prototype, "usac_account_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], users_account.prototype, "usac_saldo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], users_account.prototype, "usac_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], users_account.prototype, "usac_start_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", Date)
], users_account.prototype, "usac_end_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('now()'),
    }),
    __metadata("design:type", Date)
], users_account.prototype, "usac_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], users_account.prototype, "usac_status", void 0);
users_account = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users_account', schema: 'payment', timestamps: false })
], users_account);
exports.users_account = users_account;
//# sourceMappingURL=users_account.js.map