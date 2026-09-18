import { CreateContactMethodDto } from './dto/create-contact-method.dto';
import { UpdateContactMethodDto } from './dto/update-contact-method.dto';

export type ContactTipe = 'email' | 'phone' | 'address';

export class ContactMethod {
  id: string;
  tipe: ContactTipe;
  value: string;
  favourite: boolean;

  static fromDto(dto: CreateContactMethodDto, personId: string): ContactMethod {
    const contactMethod = new ContactMethod();
    contactMethod.id =
      dto.id ?? `${personId}-cm-${Date.now()}-${Math.random()}`;
    contactMethod.tipe = dto.tipe;
    contactMethod.value = dto.value;
    contactMethod.favourite = dto.favourite;
    return contactMethod;
  }

  updateFromDto(dto: UpdateContactMethodDto): ContactMethod {
    if (dto.tipe !== undefined) {
      this.tipe = dto.tipe;
    }
    if (dto.value !== undefined) {
      this.value = dto.value;
    }
    if (dto.favourite !== undefined) {
      this.favourite = dto.favourite;
    }
    return this;
  }
}
