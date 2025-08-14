import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArtistDto } from './dto/create-artists.dto';
import { UpdateArtistDto } from './dto/update-artists.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistsRepository.create(createArtistDto);
    return this.artistsRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find({
      relations: ['albums', 'songs'],
    });
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: { id },
      relations: ['albums', 'songs'],
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return this.artistsRepository.save(artist);
  }

  async remove(id: string): Promise<void> {
    const result = await this.artistsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
  }
  async findByCountry(country: string): Promise<Artist[]> {
    return this.artistsRepository.find({ where: { country } });
  }

  async findByDebutYear(year: number): Promise<Artist[]> {
    return this.artistsRepository.find({ where: { debut_year: year } });
  }
}
export type { CreateArtistDto };
