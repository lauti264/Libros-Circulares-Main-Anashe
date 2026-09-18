import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CreateContactMethodDto } from '../contact-method/dto/create-contact-method.dto';
import { ContactMethod } from '../contact-method/contact-method';
import { PersonCommunity } from '../shared/membership';
export declare class Person {
    static persons: Person[];
    id: string;
    name: string;
    surname: string;
    dni: string;
    contactPerson: string | null;
    fdn: string;
    communities: PersonCommunity[];
    contactMethods: ContactMethod[];
    static fromDto(dto: CreatePersonDto): Person;
    static updateFromDto(id: string, dto: UpdatePersonDto): Person;
    addContactMethod(dto: CreateContactMethodDto): ContactMethod;
    static findAll(): Person[];
    static findById(id: string): Person | undefined;
    static findByIdOrFail(id: string): Person;
    static findByDni(dni: string): Person | undefined;
    static deleteById(id: string): void;
    static reset(): void;
    isAdult(): boolean;
    static isAdult(fdn: string): boolean;
    activeCommunityCount(): number;
}
