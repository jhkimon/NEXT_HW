import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto } from './dto/update_order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('')
  @HttpCode(201)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Get('')
  @HttpCode(200)
  async getAllOrders() {
    return await this.orderService.findAll();
  }

  @Put('/:orderId')
  @HttpCode(200)
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(orderId, updateOrderDto);
  }

  @Put('/:orderId/delivered')
  @HttpCode(200)
  async markOrderAsDelivered(@Param('orderId') orderId: string) {
    await this.orderService.markAsDelivered(orderId);
  }
}
