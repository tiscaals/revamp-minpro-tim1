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
exports.transaction_payment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let transaction_payment = class transaction_payment extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('payment.transaction_payment_trpa_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'transaction_payment_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], transaction_payment.prototype, "trpa_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(55) }),
    (0, sequelize_typescript_1.Index)({
        name: 'transaction_payment_trpa_code_number_key',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", String)
], transaction_payment.prototype, "trpa_code_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(25) }),
    __metadata("design:type", String)
], transaction_payment.prototype, "trpa_order_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], transaction_payment.prototype, "trpa_debet", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], transaction_payment.prototype, "trpa_credit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], transaction_payment.prototype, "trpa_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], transaction_payment.prototype, "trpa_note", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    }),
    __metadata("design:type", Date)
], transaction_payment.prototype, "trpa_modified_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(25) }),
    __metadata("design:type", String)
], transaction_payment.prototype, "trpa_source_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(25) }),
    __metadata("design:type", String)
], transaction_payment.prototype, "trpa_target_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], transaction_payment.prototype, "trpa_user_entity_id", void 0);
transaction_payment = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'transaction_payment',
        schema: 'payment',
        timestamps: false,
    })
], transaction_payment);
exports.transaction_payment = transaction_payment;
//# sourceMappingURL=transaction_payment.js.map