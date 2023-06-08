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
exports.address = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let address = class address extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('master.address_addr_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'address_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], address.prototype, "addr_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'address_addr_line1_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], address.prototype, "addr_line1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    (0, sequelize_typescript_1.Index)({ name: 'address_addr_line2_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], address.prototype, "addr_line2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(10) }),
    (0, sequelize_typescript_1.Index)({ name: 'address_addr_postal_code_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], address.prototype, "addr_postal_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], address.prototype, "addr_spatial_location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], address.prototype, "addr_modifed_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], address.prototype, "addr_city_id", void 0);
address = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'address', schema: 'master', timestamps: false })
], address);
exports.address = address;
//# sourceMappingURL=address.js.map