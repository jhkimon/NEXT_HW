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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const board_entity_1 = require("./board.entity");
const user_entity_1 = require("../users/user.entity");
let BoardsService = class BoardsService {
    constructor(boardsRepository, usersRepository) {
        this.boardsRepository = boardsRepository;
        this.usersRepository = usersRepository;
    }
    async create(createBoardDto, userId) {
        const completeUser = await this.usersRepository.findOne({
            where: { id: userId },
        });
        if (!completeUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const board = this.boardsRepository.create({
            ...createBoardDto,
            user: completeUser,
        });
        console.log('Board to save:', board);
        return this.boardsRepository.save(board);
    }
    async findAll() {
        return this.boardsRepository.find({ relations: ['user'] });
    }
    async findOne(id, options) {
        const board = await this.boardsRepository.findOne({
            where: { id },
            relations: ['user'],
            ...options,
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID ${id} not found`);
        }
        return board;
    }
    async update(id, updateBoardDto) {
        await this.boardsRepository.update(id, updateBoardDto);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.boardsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Board with ID ${id} not found`);
        }
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BoardsService);
//# sourceMappingURL=boards.service.js.map