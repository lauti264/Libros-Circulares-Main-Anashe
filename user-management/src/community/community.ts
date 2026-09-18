import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { CommunityPerson } from '../shared/membership';

export class Community {
  static communities: Community[] = [];

  id: string;
  name: string;
  persons: CommunityPerson[];

  static fromDto(dto: CreateCommunityDto): Community {
    if (Community.findById(dto.id)) {
      throw new ConflictException(`Community ${dto.id} already exists`);
    }
    if (Community.communities.some((item) => item.name === dto.name)) {
      throw new ConflictException(`Community name ${dto.name} already exists`);
    }

    const community = new Community();
    community.id = dto.id;
    community.name = dto.name;
    community.persons = [];
    Community.communities.push(community);
    return community;
  }

  static updateFromDto(id: string, dto: UpdateCommunityDto): Community {
    const community = Community.findByIdOrFail(id);

    if (dto.name !== undefined && dto.name !== community.name) {
      if (Community.communities.some((item) => item.name === dto.name)) {
        throw new ConflictException(
          `Community name ${dto.name} already exists`,
        );
      }
      community.name = dto.name;
    }

    return community;
  }

  static findAll(): Community[] {
    return Community.communities;
  }

  static findById(id: string): Community | undefined {
    return Community.communities.find((community) => community.id === id);
  }

  static findByIdOrFail(id: string): Community {
    const community = Community.findById(id);
    if (!community) {
      throw new NotFoundException(`Community ${id} not found`);
    }
    return community;
  }

  static deleteById(id: string): void {
    const index = Community.communities.findIndex(
      (community) => community.id === id,
    );
    if (index < 0) {
      throw new NotFoundException(`Community ${id} not found`);
    }
    Community.communities.splice(index, 1);
  }

  static reset(): void {
    Community.communities = [];
  }
}
