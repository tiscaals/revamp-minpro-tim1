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
exports.business_entity = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let business_entity = class business_entity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('users.business_entity_entity_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'business_entity_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], business_entity.prototype, "entity_id", void 0);
business_entity = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'business_entity', schema: 'users', timestamps: false })
], business_entity);
exports.business_entity = business_entity;
//# sourceMappingURL=business_entity.js.map