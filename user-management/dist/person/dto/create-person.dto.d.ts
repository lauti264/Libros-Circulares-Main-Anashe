export declare class CreatePersonContactMethodDto {
    id?: string;
    tipe: 'email' | 'phone' | 'address';
    value: string;
    favourite: boolean;
}
export declare class CreatePersonCommunityDto {
    communityId: string;
    active?: boolean;
}
export declare class CreatePersonDto {
    id: string;
    name: string;
    surname: string;
    dni: string;
    fdn: string;
    contactPerson?: string;
    communities?: CreatePersonCommunityDto[];
    contactMethods?: CreatePersonContactMethodDto[];
}
