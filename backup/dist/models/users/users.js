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
exports.users = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let users = class users extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'users_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], users.prototype, "user_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    (0, sequelize_typescript_1.Index)({ name: 'users_user_name_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], users.prototype, "user_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(256) }),
    __metadata("design:type", String)
], users.prototype, "user_password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(50) }),
    __metadata("design:type", String)
], users.prototype, "user_first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(50) }),
    __metadata("design:type", String)
], users.prototype, "user_last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], users.prototype, "user_birth_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal('0'),
    }),
    __metadata("design:type", Number)
], users.prototype, "user_email_promotion", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], users.prototype, "user_demographic", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], users.prototype, "user_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], users.prototype, "user_photo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], users.prototype, "user_current_role", void 0);
users = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users', schema: 'users', timestamps: false })
], users);
exports.users = users;
//# sourceMappingURL=users.js.map