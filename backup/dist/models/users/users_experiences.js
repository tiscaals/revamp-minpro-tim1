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
exports.users_experiences = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let users_experiences = class users_experiences extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: sequelize_typescript_1.Sequelize.literal("nextval('users.users_experiences_usex_id_seq'::regclass)"),
    }),
    (0, sequelize_typescript_1.Index)({ name: 'users_experiences_pkey', using: 'btree', unique: true }),
    (0, sequelize_typescript_1.Index)({
        name: 'users_experiences_usex_id_key',
        using: 'btree',
        unique: true,
    }),
    __metadata("design:type", Number)
], users_experiences.prototype, "usex_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.INTEGER }),
    (0, sequelize_typescript_1.Index)({ name: 'users_experiences_pkey', using: 'btree', unique: true }),
    __metadata("design:type", Number)
], users_experiences.prototype, "usex_entity_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(512) }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_profile_headline", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_employment_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(255) }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_company_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(1) }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_is_current", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_start_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_end_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_industry", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(512) }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.STRING(15) }),
    __metadata("design:type", String)
], users_experiences.prototype, "usex_experience_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], users_experiences.prototype, "usex_city_id", void 0);
users_experiences = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users_experiences', schema: 'users', timestamps: false })
], users_experiences);
exports.users_experiences = users_experiences;
//# sourceMappingURL=users_experiences.js.map