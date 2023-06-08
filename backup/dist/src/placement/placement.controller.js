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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacementController = void 0;
const common_1 = require("@nestjs/common");
const placement_service_1 = require("./placement.service");
const create_placement_dto_1 = require("./dto/create-placement.dto");
const update_placement_dto_1 = require("./dto/update-placement.dto");
let PlacementController = class PlacementController {
    constructor(placementService) {
        this.placementService = placementService;
    }
    create(createPlacementDto) {
        return this.placementService.create(createPlacementDto);
    }
    findAll() {
        return this.placementService.findAll();
    }
    findOne(id) {
        return this.placementService.findOne(+id);
    }
    update(id, updatePlacementDto) {
        return this.placementService.update(+id, updatePlacementDto);
    }
    remove(id) {
        return this.placementService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_placement_dto_1.CreatePlacementDto]),
    __metadata("design:returntype", void 0)
], PlacementController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlacementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_placement_dto_1.UpdatePlacementDto]),
    __metadata("design:returntype", void 0)
], PlacementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacementController.prototype, "remove", null);
PlacementController = __decorate([
    (0, common_1.Controller)('placement'),
    __metadata("design:paramtypes", [placement_service_1.PlacementService])
], PlacementController);
exports.PlacementController = PlacementController;
//# sourceMappingURL=placement.controller.js.map