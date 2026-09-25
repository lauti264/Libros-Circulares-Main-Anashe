import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReturnDto {
  @IsString()
  @IsNotEmpty()
  loanId: string;

  @IsDate()
  @Type(() => Date)
  date?: Date;
}
