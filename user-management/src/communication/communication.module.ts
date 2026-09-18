import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OperationManagementClient } from '../infrastructure/operation-management.client';
import { CommunicationService } from './communication.service';

@Module({
  imports: [HttpModule],
  providers: [CommunicationService, OperationManagementClient],
  exports: [CommunicationService, OperationManagementClient],
})
export class CommunicationModule {}
