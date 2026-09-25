import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CreateLoanDto } from './dto/create-loan.dto';
import { CreateReturnDto } from './dto/create-return.dto';
import { CreateUnsuscribeDto } from './dto/create-unsubscribe.dto';
import { OperationService } from './operation.service';

@Controller()
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Get('persons/:personId/operations')
  getOperationsByPerson(@Param('personId') personId: string) {
    return this.operationService.getPersonOperations(personId);
  }

  @Get(['operations/user/:personId', 'users/:personId/operations/closed'])
  isPersonOperationsClosed(@Param('personId') personId: string) {
    return this.operationService.areAllOperationsClosed(personId);
  }

  @Post('loans')
  createLoan(@Body() dto: CreateLoanDto) {
    return this.operationService.createLoan(dto);
  }

  @Post('returns')
  createReturn(@Body() dto: CreateReturnDto) {
    return this.operationService.createReturn(dto);
  }

  @Post('assignments')
  createAssignment(@Body() dto: CreateAssignmentDto) {
    return this.operationService.createAssignment(dto);
  }

  @Post('unsuscribe-bs')
  createUnsuscribe(@Body() dto: CreateUnsuscribeDto) {
    return this.operationService.createUnsuscribeB(dto);
  }
}
