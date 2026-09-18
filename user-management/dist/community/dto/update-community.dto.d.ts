export declare class UpdateCommunityPersonDto {
    personId: string;
    active?: boolean;
}
export declare class UpdateCommunityDto {
    name?: string;
    persons?: UpdateCommunityPersonDto[];
}
