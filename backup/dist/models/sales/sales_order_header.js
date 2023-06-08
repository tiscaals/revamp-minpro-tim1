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
exports.sales_order_header = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let sales_order_header = class sales_order_header extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('sales.sales_order_header_sohe_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'sales_order_header_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], sales_order_header.prototype, "sohe_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_order_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_due_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_ship_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(25) }),
    (0, sequelize_typescript_1.Index)({
        name: 'sales_order_header_sohe_order_number_key',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_order_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(25) }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_account_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(55) }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_trpa_code_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_subtotal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_tax", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_total_due", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(512) }),
    (0, sequelize_typescript_1.Index)({
        name: 'sales_order_header_sohe_license_code_key',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_license_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], sales_order_header.prototype, "sohe_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], sales_order_header.prototype, "sohe_user_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], sales_order_header.prototype, "sohe_status", void 0);
sales_order_header = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'sales_order_header', schema: 'sales', timestamps: false })
], sales_order_header);
exports.sales_order_header = sales_order_header;
//# sourceMappingURL=sales_order_header.js.map