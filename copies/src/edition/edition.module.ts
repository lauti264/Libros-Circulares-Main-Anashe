import { Module } from '@nestjs/common';
import { EditionService } from './edition.service';
import { EditionController } from './edition.controller';
import { PublisherModule } from '../publisher/publisher.module';
import { BookModule } from '../book/book.module';
import { PublisherService } from '../publisher/publisher.service';
import { BookService } from '../book/book.service';

@Module({
  imports:[PublisherModule,BookModule],
  controllers: [EditionController],
  providers: [EditionService,PublisherService,BookService]

  
})
export class EditionModule {}
