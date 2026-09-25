import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';
import { AuthorService } from '../author/author.service';
import { Author } from '../author/entities/author.entity';

@Injectable()
export class PublisherService {
  static publishers: Publisher[] = [];
  
  create(createPublisherDto: CreatePublisherDto) {
    const newPublisher = new Publisher();
    newPublisher.name = createPublisherDto.name
    newPublisher.id = Math.random()
    PublisherService.publishers.push(newPublisher)

    return newPublisher.id
  }

  findAll() {
    return AuthorService.authors;
  }

  findOne(id: number) {
    const publisher = PublisherService.publishers.find(p =>p.id == id)
    if(!publisher){
      throw new NotFoundException()
    }
    return publisher
  }

  update(id: number, updatePublisherDto: UpdatePublisherDto) {
    const publisher = PublisherService.publishers.find(p => p.id == id)
    if(!publisher){
      throw new NotFoundException()
    }
    if(updatePublisherDto.name){
      updatePublisherDto.name = publisher.name
    } 
  }

  remove(id: number) {
    PublisherService.publishers = PublisherService.publishers.filter((p) => p,id != id) 
    return true
  }
}
