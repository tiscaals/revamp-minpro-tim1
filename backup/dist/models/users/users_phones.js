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
exports.users_phones = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let users_phones = class users_phones extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'users_phones_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], users_phones.prototype, "uspo_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    (0, sequelize_typescript_1.Index)({ name: 'users_phones_pkey', using: 'btree', unique: true }),
    __metadata("design:type", String)
], users_phones.prototype, "uspo_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], users_phones.prototype, "uspo_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], users_phones.prototype, "uspo_ponty_code", void 0);
users_phones = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users_phones', schema: 'users', timestamps: false })
], users_phones);
exports.users_phones = users_phones;
//# sourceMappingURL=users_phones.js.map