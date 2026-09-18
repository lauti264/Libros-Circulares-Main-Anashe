import { CreateContactMethodDto } from './dto/create-contact-method.dto';
import { UpdateContactMethodDto } from './dto/update-contact-method.dto';
export type ContactTipe = 'email' | 'phone' | 'address';
export declare class ContactMethod {
    id: string;
    tipe: ContactTipe;
    value: string;
    favourite: boolean;
    static fromDto(dto: CreateContactMethodDto, personId: string): ContactMethod;
    updateFromDto(dto: UpdateContactMethodDto): ContactMethod;
}
