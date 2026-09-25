import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateCopyDto } from './dto/create-copy.dto';
import { UpdateCopyDto } from './dto/update-copy.dto';
import { Copy } from './entities/copy.entity';
import { EditionService } from '../edition/edition.service';

@Injectable()
export class CopyService {
  constructor(private readonly editionService: EditionService,){}
  static copys: Copy[] = [];
  create(createCopyDto: CreateCopyDto) {
    const newCopy: Copy = new Copy();
    const edition = this.editionService.findOne(createCopyDto.editionId);
    newCopy.id = Math.random();
    newCopy.edition = edition;
    newCopy.ownerId = createCopyDto.ownerId;
    CopyService.copys.push(newCopy);
    return newCopy.id;
  }

  findAll() {
    return CopyService.copys;
  }

  findOne(id: number) {
    const copy = CopyService.copys.find(c => c.id == id);  
      if(!copy) {
        throw new NotFoundException()
      }   
    return copy
  }

  update(id: number, updateCopyDto: UpdateCopyDto) {
    const copy = this.findOne(id);
    copy.ownerId = updateCopyDto.ownerId;
    return copy;
  }

  remove(id: number) {
    CopyService.copys = CopyService.copys.filter(c => c.id !== id);
  }
}
