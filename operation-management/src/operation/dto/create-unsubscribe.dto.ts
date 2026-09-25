import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateUnsuscribeDto {
  @IsString()
  @IsNotEmpty()
  copyId: string;

  @IsDate()
  @Type(() => Date)
  date?: Date;
}
