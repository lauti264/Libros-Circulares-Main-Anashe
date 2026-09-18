import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
export declare class CommunityController {
    private readonly communityService;
    constructor(communityService: CommunityService);
    findAll(): import("./community").Community[];
    findOne(id: string): import("./community").Community;
    create(dto: CreateCommunityDto): import("./community").Community;
    update(id: string, dto: UpdateCommunityDto): Promise<import("./community").Community>;
    remove(id: string): Promise<void>;
}
