import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { AuthorService } from '../author/author.service';
import { GenreService } from '../genre/genre.service';

@Injectable()
export class BookService {
  constructor(private readonly authorService: AuthorService,private readonly genreService: GenreService){}
  books: Book[] = []
  create(createBookDto: CreateBookDto) {
    const genres = this.genreService.findOne(createBookDto.genreId)
    const authors = createBookDto.authorsId.map(a => this.authorService.findOne(a))
    const newBook = new Book()
    newBook.name = createBookDto.name;
    newBook.id = Math.random()
    newBook.authors = authors
    newBook.genre = genres
    this.books.push(newBook)
  return newBook.id;
  }

  findAll() {
    return this.books
  }

  findOne(id: number) {
    const book = this.books.find(b => b.id == id);
        if(!book){
          throw new NotFoundException()
        }
        return book
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.books.find(a => a.id ==id)
    if(!book){
      throw new NotFoundException()
    }
    if(updateBookDto.name){
      book.name = updateBookDto.name
    }
    if(updateBookDto.authorsId){
      book.authors = updateBookDto.authorsId.map(a => this.authorService.findOne(a))
    }
    if(updateBookDto.genreId){
      book.genre = this.genreService.findOne(updateBookDto.genreId)
    }

  }

  remove(id: number) {
    this.books = this.books.filter((a) => a,id != id)
  }
}
