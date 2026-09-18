import { CommunicationService } from '../communication/communication.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './person';
export declare class PersonService {
    private readonly communicationService;
    constructor(communicationService: CommunicationService);
    findAll(): Person[];
    findOne(id: string): Person;
    create(dto: CreatePersonDto): Promise<Person>;
    update(id: string, dto: UpdatePersonDto): Promise<Person>;
    remove(id: string): Promise<void>;
    private assertContactPerson;
}
