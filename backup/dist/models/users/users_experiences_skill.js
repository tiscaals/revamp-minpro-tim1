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
exports.users_experiences_skill = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let users_experiences_skill = class users_experiences_skill extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'users_experiences_skill_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], users_experiences_skill.prototype, "uesk_usex_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'users_experiences_skill_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], users_experiences_skill.prototype, "uesk_uski_id", void 0);
users_experiences_skill = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'users_experiences_skill',
        schema: 'users',
        timestamps: false,
    })
], users_experiences_skill);
exports.users_experiences_skill = users_experiences_skill;
//# sourceMappingURL=users_experiences_skill.js.map