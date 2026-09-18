import { Module } from '@nestjs/common';
import { ContactMethodController } from './contact-method.controller';
import { ContactMethodService } from './contact-method.service';

@Module({
  controllers: [ContactMethodController],
  providers: [ContactMethodService],
})
export class ContactMethodModule {}
