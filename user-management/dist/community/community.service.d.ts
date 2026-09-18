import { CommunicationService } from '../communication/communication.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './community';
export declare class CommunityService {
    private readonly communicationService;
    constructor(communicationService: CommunicationService);
    findAll(): Community[];
    findOne(id: string): Community;
    create(dto: CreateCommunityDto): Community;
    update(id: string, dto: UpdateCommunityDto): Promise<Community>;
    remove(id: string): Promise<void>;
}
