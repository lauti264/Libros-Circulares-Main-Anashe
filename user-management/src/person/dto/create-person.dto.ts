import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreatePersonContactMethodDto {
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

export class CreatePersonCommunityDto {
  @IsString()
  communityId: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class CreatePersonDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  dni: string;

  @IsDateString()
  fdn: string;

  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePersonCommunityDto)
  communities?: CreatePersonCommunityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePersonContactMethodDto)
  contactMethods?: CreatePersonContactMethodDto[];
}
