import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateContactMethodDto {
  @IsOptional()
  @IsIn(['email', 'phone', 'address'])
  tipe?: 'email' | 'phone' | 'address';

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsBoolean()
  favourite?: boolean;
}
