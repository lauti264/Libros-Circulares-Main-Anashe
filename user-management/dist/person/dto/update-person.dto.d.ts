import { CreatePersonCommunityDto, CreatePersonContactMethodDto } from './create-person.dto';
export declare class UpdatePersonDto {
    contactPerson?: string | null;
    communities?: CreatePersonCommunityDto[];
    contactMethods?: CreatePersonContactMethodDto[];
}
