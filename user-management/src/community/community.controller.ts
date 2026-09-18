import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  findAll() {
    return this.communityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communityService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCommunityDto) {
    return this.communityService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCommunityDto) {
    return this.communityService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.communityService.remove(id);
  }
}
