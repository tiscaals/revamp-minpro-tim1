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
exports.special_offer_programs = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let special_offer_programs = class special_offer_programs extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('sales.special_offer_programs_soco_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'special_offer_programs_pkey', using: 'btree', unique: true }),
    (0, sequelize_typescript_1.Index)({
        name: 'special_offer_programs_soco_id_key',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", Number)
], special_offer_programs.prototype, "soco_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'special_offer_programs_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], special_offer_programs.prototype, "soco_spof_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'special_offer_programs_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], special_offer_programs.prototype, "soco_prog_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], special_offer_programs.prototype, "soco_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], special_offer_programs.prototype, "soco_modified_date", void 0);
special_offer_programs = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'special_offer_programs',
        schema: 'sales',
        timestamps: false,
    })
], special_offer_programs);
exports.special_offer_programs = special_offer_programs;
//# sourceMappingURL=special_offer_programs.js.map