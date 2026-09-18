import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import {
  CreatePersonCommunityDto,
  CreatePersonContactMethodDto,
} from './create-person.dto';

export class UpdatePersonDto {
  @IsOptional()
  @IsString()
  contactPerson?: string | null;

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
