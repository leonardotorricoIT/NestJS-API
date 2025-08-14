import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Song } from '../../songs/entities/song.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column('date')
  release_date: Date;

  @Column('uuid')
  artist_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
