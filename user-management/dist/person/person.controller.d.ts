import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PersonController {
    private readonly personService;
    constructor(personService: PersonService);
    findAll(): import("./person").Person[];
    findOne(id: string): import("./person").Person;
    create(dto: CreatePersonDto): Promise<import("./person").Person>;
    update(id: string, dto: UpdatePersonDto): Promise<import("./person").Person>;
    remove(id: string): Promise<void>;
}
