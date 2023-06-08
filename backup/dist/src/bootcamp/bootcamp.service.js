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
exports.BootcampService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
let BootcampService = class BootcampService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async create(body) {
        try {
            const { batch_entity_id, batch_name, batch_description, batch_start_date, batch_end_date, batch_status, batch_reason, batch_type, batch_modified_date, batch_pic_id, batr_status, batr_certificated, batr_certificate_link, batr_access_token, batr_access_grant, batr_review, batr_total_score, batr_modified_date, batr_trainee_entity_id } = body.data;
            const data = {
                batch_entity_id: batch_entity_id,
                batch_name: batch_name,
                batch_description: batch_description,
                batch_start_date: batch_start_date,
                batch_end_date: batch_end_date,
                batch_status: batch_status,
                batch_reason: batch_reason,
                batch_type: batch_type,
                batch_modified_date: batch_modified_date,
                batch_pic_id: batch_pic_id,
            };
            const data2 = {
                batr_status: batr_status,
                batr_certificated: batr_certificated,
                batr_certificate_link: batr_certificate_link,
                batr_access_token: batr_access_token,
                batr_access_grant: batr_access_grant,
                batr_review: batr_review,
                batr_total_score: batr_total_score,
                batr_modified_date: batr_modified_date,
                batr_trainee_entity_id: batr_trainee_entity_id
            };
            const data3 = body.instructors;
            const dataString = `[${JSON.stringify(data)}]`;
            const data2String = `[${JSON.stringify(data2)}]`;
            const data3String = `${JSON.stringify(data3)}`;
            await this.sequelize.query(`call bootcamp.createBatch ('${dataString}','${data2String}','${data3String}')`);
            return {
                status: 201,
                message: 'sukses'
            };
        }
        catch (error) {
            return { status: 400, message: error.message };
        }
    }
    async findAll() {
        try {
            const data = await this.sequelize.query('select * from bootcamp.batch');
            return {
                message: 'sukses',
                data: data[0]
            };
        }
        catch (error) {
            return {
                status: 400,
                message: error.message
            };
        }
    }
    async findOne(id) {
        try {
            const data = await this.sequelize.query(`select * from bootcamp.batch where batch_id=${id}`);
            if (data[0].length === 0)
                throw new Error('Id tidak ditemukan');
            return {
                status: 200,
                message: 'sukses',
                data: data[0]
            };
        }
        catch (error) {
            return { status: 400, message: error.message };
        }
    }
    async update(id, body) {
        try {
            const find = await this.sequelize.query(`select * from bootcamp.batch where batch_id=${id}`);
            if (find[0].length === 0)
                throw new Error('Id tidak ditemukan');
            const { batch_entity_id, batch_name, batch_description, batch_start_date, batch_end_date, batch_status, batch_reason, batch_type, batch_modified_date, batch_pic_id, batr_status, batr_certificated, batr_certificate_link, batr_access_token, batr_access_grant, batr_review, batr_total_score, batr_modified_date, batr_trainee_entity_id, } = body.data;
            const data = {
                batch_id: id,
                batch_entity_id: batch_entity_id,
                batch_name: batch_name,
                batch_description: batch_description,
                batch_start_date: batch_start_date,
                batch_end_date: batch_end_date,
                batch_status: batch_status,
                batch_reason: batch_reason,
                batch_type: batch_type,
                batch_modified_date: batch_modified_date,
                batch_pic_id: batch_pic_id,
            };
            const data2 = {
                batr_status: batr_status,
                batr_certificated: batr_certificated,
                batr_certificate_link: batr_certificate_link,
                batr_access_token: batr_access_token,
                batr_access_grant: batr_access_grant,
                batr_review: batr_review,
                batr_total_score: batr_total_score,
                batr_modified_date: batr_modified_date,
                batr_trainee_entity_id: batr_trainee_entity_id
            };
            const data3 = body.instructors;
            const dataString = `[${JSON.stringify(data)}]`;
            const data2String = `[${JSON.stringify(data2)}]`;
            const data3String = `${JSON.stringify(data3)}`;
            await this.sequelize.query(`call bootcamp.updateBatchWithBatchTrainee2 ('${dataString}','${data2String}','${data3String}')`);
            return {
                status: 201,
                message: 'sukses'
            };
        }
        catch (error) {
            return { status: 400, message: error.message };
        }
    }
    async changeStatus(id, status) {
        try {
            const find = await this.sequelize.query(`select * from bootcamp.batch where batch_id = ${id}`);
            if (find[0].length === 0)
                throw new Error('Data tidak ditemukan');
            const data = await this.sequelize.query(`update bootcamp.batch set batch_status = '${status}' where batch_id = ${id} returning *`);
            return {
                status: 200,
                message: 'sukses',
                data: data[0]
            };
        }
        catch (error) {
            return {
                status: 400,
                message: error.message
            };
        }
    }
    async remove(id) {
        try {
            const find = await this.sequelize.query(`select * from bootcamp.batch where batch_id=${id}`);
            if (find[0].length === 0)
                throw new Error('Data tidak ditemukan');
        }
        catch (error) {
        }
    }
    async createEvaluation(body) {
        try {
            return {
                data: body
            };
        }
        catch (error) {
        }
    }
};
BootcampService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize])
], BootcampService);
exports.BootcampService = BootcampService;
//# sourceMappingURL=bootcamp.service.js.map