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
exports.phone_number_type = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let phone_number_type = class phone_number_type extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    (0, sequelize_typescript_1.Index)({ name: 'phone_number_type_pkey', using: 'btree', unique: true }),
    __metadata("design:type", String)
], phone_number_type.prototype, "ponty_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], phone_number_type.prototype, "ponty_modified_date", void 0);
phone_number_type = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'phone_number_type', schema: 'users', timestamps: false })
], phone_number_type);
exports.phone_number_type = phone_number_type;
//# sourceMappingURL=phone_number_type.js.map