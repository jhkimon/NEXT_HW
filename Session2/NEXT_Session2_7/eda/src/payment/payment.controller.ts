import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderCreatedEvent } from 'src/order/dto/order_event.dto';
import { PaymentService } from './payment.service';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @OnEvent('order.created')
  async handleOrderCreatedEvent(event: OrderCreatedEvent) {
    this.paymentService.createPayment(event.orderId);
  }
}
