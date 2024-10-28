import { BookService } from './book.service';
import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';

@Controller('book')
export class BookController {
  bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  @Get()
  getAllBooks() {
    console.log('모든 책 목록 가져오기');
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() bookDto) {
    console.log('책 추가');
    this.bookService.createBook(bookDto);
    return 'success';
  }

  @Get('/:id')
  getBook(@Param('id') id: string) {
    console.log([`id: ${id}책 하나 가져오기`]);
    return this.bookService.getBook(id);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    console.log('게시글 삭제');
    this.bookService.delete(id);
    return 'success';
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() bookDto) {
    console.log('게시글 업데이트', id, bookDto);
    return this.bookService.updateBook(id, bookDto);
  }
}
