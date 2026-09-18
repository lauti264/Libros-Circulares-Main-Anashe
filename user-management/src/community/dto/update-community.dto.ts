import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateCommunityPersonDto {
  @IsString()
  personId: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateCommunityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCommunityPersonDto)
  persons?: UpdateCommunityPersonDto[];
}
