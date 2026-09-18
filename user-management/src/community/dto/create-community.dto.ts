import { IsString } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
