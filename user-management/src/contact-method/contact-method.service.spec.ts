import { Test, TestingModule } from '@nestjs/testing';
import { ContactMethodService } from './contact-method.service';
import { Person } from '../person/person';

describe('ContactMethodService', () => {
  let service: ContactMethodService;

  beforeEach(async () => {
    Person.reset();
    Person.fromDto({
      id: 'p1',
      name: 'Ana',
      surname: 'Lopez',
      dni: '111',
      fdn: '1990-01-01',
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactMethodService],
    }).compile();
    service = module.get(ContactMethodService);
  });

  it('creates a contact method for an existing person', () => {
    const created = service.create('p1', {
      id: 'cm1',
      tipe: 'email',
      value: 'ana@test.com',
      favourite: true,
    });
    expect(created.favourite).toBe(true);
    expect(service.findAll('p1')).toHaveLength(1);
  });

  it('moves favourite to another method when the favourite is deleted', () => {
    service.create('p1', {
      id: 'cm1',
      tipe: 'email',
      value: 'ana@test.com',
      favourite: true,
    });
    service.create('p1', {
      id: 'cm2',
      tipe: 'phone',
      value: '123',
      favourite: false,
    });
    service.remove('p1', 'cm1');
    expect(Person.findByIdOrFail('p1').contactMethods[0].favourite).toBe(true);
  });
});
