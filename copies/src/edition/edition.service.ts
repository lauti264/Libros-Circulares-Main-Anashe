import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEditionDto } from './dto/create-edition.dto';
import { UpdateEditionDto } from './dto/update-edition.dto';
import { Edition } from './entities/edition.entity';
import { PublisherService } from '../publisher/publisher.service';
import { BookService } from '../book/book.service';
@Injectable()
export class EditionService {
  static editions: Edition [] = [];
  
  constructor(private readonly publisherService: PublisherService, private readonly bookService: BookService){}
  create(createEditionDto: CreateEditionDto) {
  const book = this.bookService.findOne(createEditionDto.bookId)
  const publisher = this.publisherService.findOne(createEditionDto.publisherId)
  const newEdition = new Edition()
  newEdition.year = createEditionDto.year
  newEdition.id = Math.random()
  newEdition.book = book
  newEdition.publisher = publisher
  EditionService.editions.push(newEdition)
}

  findAll() {
    return EditionService.editions
  }

  findOne(id: number) {
    const edition = EditionService.editions.find(e =>e.id == id)
      if(!edition){
        throw new NotFoundException()
      }
      return edition
  }

  update(id: number, updateEditionDto: UpdateEditionDto) {
    const edition = EditionService.editions.find(e => e.id == id);
    if(!edition){
      throw new NotFoundException()
    }
    if(updateEditionDto.year){
      edition.year = updateEditionDto.year
    }
    if(updateEditionDto.publisherId){
      edition.publisher = this.publisherService.findOne(updateEditionDto.publisherId)
    }
    if(updateEditionDto.bookId){
      edition.book = this.bookService.findOne(updateEditionDto.bookId)
    }
  }

  remove(id: number) {
    EditionService.editions = EditionService.editions.filter((e) => e.id != id);
    return true;
  }

}
