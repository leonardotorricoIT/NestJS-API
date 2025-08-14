import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './database/database.config';
import { ProductsModule } from './products/products.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { GenresModule } from './genres/genres.module';
import { SongsModule } from './songs/songs.module';
import { ArtistService } from './artist/artist.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    DatabaseModule,
    ProductsModule,
    ArtistsModule,
    AlbumsModule,
    GenresModule,
    SongsModule,
  ],
  providers: [ArtistService],
})
export class AppModule {}
