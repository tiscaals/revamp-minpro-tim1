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
exports.skill_type = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let skill_type = class skill_type extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.STRING(55) }),
    (0, sequelize_typescript_1.Index)({ name: 'skill_type_pkey', using: 'btree', unique: true }),
    __metadata("design:type", String)
], skill_type.prototype, "skty_name", void 0);
skill_type = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'skill_type', schema: 'master', timestamps: false })
], skill_type);
exports.skill_type = skill_type;
//# sourceMappingURL=skill_type.js.map