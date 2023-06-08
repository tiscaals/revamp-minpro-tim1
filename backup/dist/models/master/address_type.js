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
exports.address_type = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let address_type = class address_type extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('master.address_type_adty_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'address_type_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], address_type.prototype, "adty_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    (0, sequelize_typescript_1.Index)({ name: 'address_type_adty_name_key', using: 'btree', unique: true }),
    __metadata("design:type", String)
], address_type.prototype, "adty_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], address_type.prototype, "adty_modified_date", void 0);
address_type = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'address_type', schema: 'master', timestamps: false })
], address_type);
exports.address_type = address_type;
//# sourceMappingURL=address_type.js.map