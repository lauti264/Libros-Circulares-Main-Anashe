import { ContactMethodService } from './contact-method.service';
import { CreateContactMethodDto } from './dto/create-contact-method.dto';
import { UpdateContactMethodDto } from './dto/update-contact-method.dto';
export declare class ContactMethodController {
    private readonly contactMethodService;
    constructor(contactMethodService: ContactMethodService);
    findAll(personId: string): import("./contact-method").ContactMethod[];
    create(personId: string, dto: CreateContactMethodDto): import("./contact-method").ContactMethod;
    update(personId: string, contactMethodId: string, dto: UpdateContactMethodDto): import("./contact-method").ContactMethod;
    remove(personId: string, contactMethodId: string): void;
}
