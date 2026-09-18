import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactMethodDto } from './dto/create-contact-method.dto';
import { UpdateContactMethodDto } from './dto/update-contact-method.dto';
import { ContactMethod } from './contact-method';
import { Person } from '../person/person';

@Injectable()
export class ContactMethodService {
  findAll(personId: string): ContactMethod[] {
    return Person.findByIdOrFail(personId).contactMethods;
  }

  create(personId: string, dto: CreateContactMethodDto): ContactMethod {
    const person = Person.findByIdOrFail(personId);
    return person.addContactMethod(dto);
  }

  update(
    personId: string,
    contactMethodId: string,
    dto: UpdateContactMethodDto,
  ): ContactMethod {
    const person = Person.findByIdOrFail(personId);
    const contactMethod = person.contactMethods.find(
      (item: ContactMethod) => item.id === contactMethodId,
    );
    if (!contactMethod) {
      throw new NotFoundException(
        `ContactMethod ${contactMethodId} not found`,
      );
    }
    contactMethod.updateFromDto(dto);
    if (dto.favourite) {
      for (const item of person.contactMethods) {
        if (item.id !== contactMethodId) {
          item.favourite = false;
        }
      }
    }
    return contactMethod;
  }

  remove(personId: string, contactMethodId: string): void {
    const person = Person.findByIdOrFail(personId);
    const index = person.contactMethods.findIndex(
      (item: ContactMethod) => item.id === contactMethodId,
    );
    if (index < 0) {
      throw new NotFoundException(
        `ContactMethod ${contactMethodId} not found`,
      );
    }
    const [removed] = person.contactMethods.splice(index, 1);
    if (removed.favourite && person.contactMethods.length > 0) {
      person.contactMethods[0].favourite = true;
    }
  }
}
