import { CreateContactMethodDto } from './dto/create-contact-method.dto';
import { UpdateContactMethodDto } from './dto/update-contact-method.dto';
import { ContactMethod } from './contact-method';
export declare class ContactMethodService {
    findAll(personId: string): ContactMethod[];
    create(personId: string, dto: CreateContactMethodDto): ContactMethod;
    update(personId: string, contactMethodId: string, dto: UpdateContactMethodDto): ContactMethod;
    remove(personId: string, contactMethodId: string): void;
}
