import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CreateContactMethodDto } from '../contact-method/dto/create-contact-method.dto';
import { ContactMethod } from '../contact-method/contact-method';
import { PersonCommunity } from '../shared/membership';

export class Person {
  static persons: Person[] = [];

  id: string;
  name: string;
  surname: string;
  dni: string;
  contactPerson: string | null;
  fdn: string;
  communities: PersonCommunity[];
  contactMethods: ContactMethod[];

  static fromDto(dto: CreatePersonDto): Person {
    if (Person.findById(dto.id)) {
      throw new ConflictException(`Person ${dto.id} already exists`);
    }
    if (Person.findByDni(dto.dni)) {
      throw new ConflictException(`DNI ${dto.dni} already exists`);
    }

    const person = new Person();
    person.id = dto.id;
    person.name = dto.name;
    person.surname = dto.surname;
    person.dni = dto.dni;
    person.fdn = dto.fdn;
    person.contactPerson = dto.contactPerson ?? null;
    person.communities = [];
    person.contactMethods = [];
    Person.persons.push(person);

    if (dto.contactMethods?.length) {
      for (const methodDto of dto.contactMethods) {
        person.addContactMethod(methodDto);
      }
    }

    return person;
  }

  static updateFromDto(id: string, dto: UpdatePersonDto): Person {
    const person = Person.findByIdOrFail(id);

    if (dto.contactPerson !== undefined) {
      person.contactPerson = dto.contactPerson;
    }

    if (dto.contactMethods) {
      person.contactMethods = [];
      for (const methodDto of dto.contactMethods) {
        person.addContactMethod(methodDto);
      }
    }

    return person;
  }

  addContactMethod(dto: CreateContactMethodDto): ContactMethod {
    const contactMethod = ContactMethod.fromDto(dto, this.id);
    if (this.contactMethods.some((item) => item.id === contactMethod.id)) {
      throw new ConflictException(
        `ContactMethod ${contactMethod.id} already exists`,
      );
    }
    if (contactMethod.favourite) {
      for (const item of this.contactMethods) {
        item.favourite = false;
      }
    }
    this.contactMethods.push(contactMethod);
    return contactMethod;
  }

  static findAll(): Person[] {
    return Person.persons;
  }

  static findById(id: string): Person | undefined {
    return Person.persons.find((person) => person.id === id);
  }

  static findByIdOrFail(id: string): Person {
    const person = Person.findById(id);
    if (!person) {
      throw new NotFoundException(`Person ${id} not found`);
    }
    return person;
  }

  static findByDni(dni: string): Person | undefined {
    return Person.persons.find((person) => person.dni === dni);
  }

  static deleteById(id: string): void {
    const index = Person.persons.findIndex((person) => person.id === id);
    if (index < 0) {
      throw new NotFoundException(`Person ${id} not found`);
    }
    Person.persons.splice(index, 1);
  }

  static reset(): void {
    Person.persons = [];
  }

  isAdult(): boolean {
    return Person.isAdult(this.fdn);
  }

  static isAdult(fdn: string): boolean {
    const birth = new Date(fdn);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && now.getDate() < birth.getDate())
    ) {
      age -= 1;
    }
    return age >= 18;
  }

  activeCommunityCount(): number {
    return this.communities.filter((membership) => membership.active).length;
  }
}
