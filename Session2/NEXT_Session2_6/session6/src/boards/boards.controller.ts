import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @Request() req,
  ): Promise<Board> {
    return this.boardsService.create(createBoardDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Board> {
    return this.boardsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Request() req,
  ): Promise<Board> {
    return this.boardsService.update(id, updateBoardDto, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<void> {
    return this.boardsService.remove(id, req.user.userId);
  }
}
