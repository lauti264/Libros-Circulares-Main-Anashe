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
import { ContactMethodService } from './contact-method.service';
import { CreateContactMethodDto } from './dto/create-contact-method.dto';
import { UpdateContactMethodDto } from './dto/update-contact-method.dto';

@Controller('persons/:id/contact-methods')
export class ContactMethodController {
  constructor(private readonly contactMethodService: ContactMethodService) {}

  @Get()
  findAll(@Param('id') personId: string) {
    return this.contactMethodService.findAll(personId);
  }

  @Post()
  create(
    @Param('id') personId: string,
    @Body() dto: CreateContactMethodDto,
  ) {
    return this.contactMethodService.create(personId, dto);
  }

  @Patch(':contactMethodId')
  update(
    @Param('id') personId: string,
    @Param('contactMethodId') contactMethodId: string,
    @Body() dto: UpdateContactMethodDto,
  ) {
    return this.contactMethodService.update(personId, contactMethodId, dto);
  }

  @Delete(':contactMethodId')
  @HttpCode(204)
  remove(
    @Param('id') personId: string,
    @Param('contactMethodId') contactMethodId: string,
  ) {
    this.contactMethodService.remove(personId, contactMethodId);
  }
}
