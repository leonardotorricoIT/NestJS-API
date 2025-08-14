import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column('int')
  duration: number;

  @Column('uuid')
  album_id: string;

  @Column('uuid')
  artist_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Album, (album) => album.songs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'album_id' })
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.songs, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @ManyToMany(() => Genre, (genre) => genre.songs, {
    eager: true,
  })
  @JoinTable({
    name: 'song_genres',
    joinColumn: {
      name: 'song_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];
}
