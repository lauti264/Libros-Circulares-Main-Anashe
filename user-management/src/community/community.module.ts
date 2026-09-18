import { Module } from '@nestjs/common';
import { CommunicationModule } from '../communication/communication.module';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

@Module({
  imports: [CommunicationModule],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
