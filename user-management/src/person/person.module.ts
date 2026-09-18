import { Module } from '@nestjs/common';
import { CommunicationModule } from '../communication/communication.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [CommunicationModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
