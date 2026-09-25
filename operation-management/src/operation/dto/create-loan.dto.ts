import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  @IsNotEmpty()
  copyId: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  ownerLoan: string;

  @IsDate()
  @Type(() => Date)
  dateBegin?: Date;

  @IsDate()
  @Type(() => Date)
  dateEnd?: Date;
}
