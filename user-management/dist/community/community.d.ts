import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { CommunityPerson } from '../shared/membership';
export declare class Community {
    static communities: Community[];
    id: string;
    name: string;
    persons: CommunityPerson[];
    static fromDto(dto: CreateCommunityDto): Community;
    static updateFromDto(id: string, dto: UpdateCommunityDto): Community;
    static findAll(): Community[];
    static findById(id: string): Community | undefined;
    static findByIdOrFail(id: string): Community;
    static deleteById(id: string): void;
    static reset(): void;
}
