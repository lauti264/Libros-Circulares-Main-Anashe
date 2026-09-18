export declare class CreateContactMethodDto {
    id?: string;
    tipe: 'email' | 'phone' | 'address';
    value: string;
    favourite: boolean;
}
