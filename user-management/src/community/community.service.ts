import { Injectable } from '@nestjs/common';
import { CommunicationService } from '../communication/communication.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './community';

@Injectable()
export class CommunityService {
  constructor(private readonly communicationService: CommunicationService) {}

  findAll(): Community[] {
    return Community.findAll();
  }

  findOne(id: string): Community {
    return Community.findByIdOrFail(id);
  }

  create(dto: CreateCommunityDto): Community {
    return Community.fromDto(dto);
  }

  async update(id: string, dto: UpdateCommunityDto): Promise<Community> {
    const community = Community.updateFromDto(id, { name: dto.name });
    if (dto.persons) {
      await this.communicationService.syncCommunityPersons(id, dto.persons);
    }
    return community;
  }

  async remove(id: string): Promise<void> {
    await this.communicationService.removeCommunity(id);
  }
}
