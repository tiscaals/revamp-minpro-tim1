"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const master_module_1 = require("./master/master.module");
const curriculum_module_1 = require("./curriculum/curriculum.module");
const placement_module_1 = require("./placement/placement.module");
const job_hire_module_1 = require("./job-hire/job-hire.module");
const sales_module_1 = require("./sales/sales.module");
const payment_module_1 = require("./payment/payment.module");
const bootcamp_module_1 = require("./bootcamp/bootcamp.module");
const users_module_1 = require("./users/users.module");
const sequelize_1 = require("@nestjs/sequelize");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'images'),
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                useFactory: () => ({
                    dialect: 'postgres',
                    host: 'localhost',
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                    models: [],
                    autoLoadModels: true,
                }),
            }),
            users_module_1.UsersModule, bootcamp_module_1.BootcampModule, payment_module_1.PaymentModule, sales_module_1.SalesModule, job_hire_module_1.JobHireModule, placement_module_1.PlacementModule, curriculum_module_1.CurriculumModule, master_module_1.MasterModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map