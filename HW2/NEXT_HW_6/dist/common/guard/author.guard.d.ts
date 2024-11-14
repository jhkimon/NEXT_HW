import { CanActivate, ExecutionContext } from '@nestjs/common';
import { BoardsService } from '../../boards/boards.service';
import { Reflector } from '@nestjs/core';
export declare class AuthorGuard implements CanActivate {
    private readonly boardsService;
    private readonly reflector;
    constructor(boardsService: BoardsService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
