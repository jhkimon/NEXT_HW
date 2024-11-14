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
exports.AuthorGuard = void 0;
const common_1 = require("@nestjs/common");
const boards_service_1 = require("../../boards/boards.service");
const core_1 = require("@nestjs/core");
let AuthorGuard = class AuthorGuard {
    constructor(boardsService, reflector) {
        this.boardsService = boardsService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const boardId = parseInt(request.params.id, 10);
        if (!user || !boardId) {
            throw new common_1.ForbiddenException('유효하지 않은 요청입니다.');
        }
        const board = await this.boardsService.findOne(boardId);
        if (!board) {
            throw new common_1.ForbiddenException('보드가 존재하지 않습니다.');
        }
        if (board.user.id !== user.userId && user.role !== 'admin') {
            throw new common_1.ForbiddenException('작성자만 해당 댓글을 지울 수 있습니다.');
        }
        return true;
    }
};
exports.AuthorGuard = AuthorGuard;
exports.AuthorGuard = AuthorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [boards_service_1.BoardsService,
        core_1.Reflector])
], AuthorGuard);
//# sourceMappingURL=author.guard.js.map