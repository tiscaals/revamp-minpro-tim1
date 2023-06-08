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
exports.route_actions = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let route_actions = class route_actions extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'route_actions_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], route_actions.prototype, "roac_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    (0, sequelize_typescript_1.Index)({ name: 'route_actions_roac_name_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], route_actions.prototype, "roac_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], route_actions.prototype, "roac_orderby", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(1) }),
    __metadata("design:type", String)
], route_actions.prototype, "roac_display", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(125) }),
    __metadata("design:type", String)
], route_actions.prototype, "roac_module_name", void 0);
route_actions = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'route_actions', schema: 'master', timestamps: false })
], route_actions);
exports.route_actions = route_actions;
//# sourceMappingURL=route_actions.js.map