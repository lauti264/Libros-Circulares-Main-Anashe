import { BadRequestException, Injectable } from '@nestjs/common';
import { CommunicationService } from '../communication/communication.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './person';

@Injectable()
export class PersonService {
  constructor(private readonly communicationService: CommunicationService) {}

  findAll(): Person[] {
    return Person.findAll();
  }

  findOne(id: string): Person {
    return Person.findByIdOrFail(id);
  }

  async create(dto: CreatePersonDto): Promise<Person> {
    this.assertContactPerson(dto.fdn, dto.contactPerson);
    const communities = dto.communities;
    const person = Person.fromDto({ ...dto, communities: undefined });
    if (communities?.length) {
      await this.communicationService.syncPersonCommunities(
        person.id,
        communities,
      );
    }
    return person;
  }

  async update(id: string, dto: UpdatePersonDto): Promise<Person> {
    Person.findByIdOrFail(id);
    if (dto.contactPerson !== undefined) {
      const person = Person.findByIdOrFail(id);
      this.assertContactPerson(person.fdn, dto.contactPerson ?? undefined);
    }
    const person = Person.updateFromDto(id, {
      contactPerson: dto.contactPerson,
      contactMethods: dto.contactMethods,
    });
    if (dto.communities) {
      await this.communicationService.syncPersonCommunities(
        id,
        dto.communities,
      );
    }
    return person;
  }

  async remove(id: string): Promise<void> {
    await this.communicationService.removePerson(id);
  }

  private assertContactPerson(
    fdn: string,
    contactPersonId?: string | null,
  ): void {
    const isAdult = Person.isAdult(fdn);
    if (!isAdult) {
      if (!contactPersonId) {
        throw new BadRequestException(
          'A minor must have a registered adult contactPerson',
        );
      }
    }
    if (!contactPersonId) {
      return;
    }
    const contactPerson = Person.findById(contactPersonId);
    if (!contactPerson) {
      throw new BadRequestException(
        'contactPerson must already exist in the system',
      );
    }
    if (!contactPerson.isAdult()) {
      throw new BadRequestException('contactPerson must be an adult');
    }
  }
}
