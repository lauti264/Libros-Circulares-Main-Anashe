import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateContactMethodDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsIn(['email', 'phone', 'address'])
  tipe: 'email' | 'phone' | 'address';

  @IsString()
  value: string;

  @IsBoolean()
  favourite: boolean;
}
