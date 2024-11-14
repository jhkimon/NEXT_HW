import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { BoardsService } from '../../boards/boards.service';
import { Reflector } from '@nestjs/core';
import { UserRoleTypes } from 'src/users/types/user-roles.types';

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly boardsService: BoardsService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const boardId = parseInt(request.params.id, 10);

        if (!user || !boardId) {
            throw new ForbiddenException('유효하지 않은 요청입니다.');
        }

        const board = await this.boardsService.findOne(boardId);
        if (!board) {
            throw new ForbiddenException('보드가 존재하지 않습니다.');
        }

        // 핵심 확인 로직
        if (board.user.id !== user.userId && user.role !== 'admin') {
            throw new ForbiddenException('작성자만 해당 댓글을 지울 수 있습니다.');
        }

        return true;
    }
}
