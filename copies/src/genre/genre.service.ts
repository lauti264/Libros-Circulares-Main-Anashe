import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  static genres: Genre[] = [];

  create(createGenreDto: CreateGenreDto) {
    const newGenre = new Genre();
    newGenre.name = createGenreDto.name;
    newGenre.id = Math.random();
    GenreService.genres.push(newGenre);

    return newGenre.id;
  }

  findAll() {
    return GenreService.genres;
  }

  findOne(id: number) {
    const genre = GenreService.genres.find(g=> g.id == id)
    if(!genre){
      console.log("dsjfb sdhibvgfdf")
      throw new NotFoundException()
    }
    return genre
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = GenreService.genres.find(g => g.id == id)
    if(!genre){
      throw new NotFoundException()
    }
    genre.name= updateGenreDto.name
  }

  remove(id: number) {
    GenreService.genres = GenreService.genres.filter((g) => g.id != id);
    return true;
  }
}
