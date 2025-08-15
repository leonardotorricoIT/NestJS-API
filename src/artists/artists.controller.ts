import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ArtistsService } from './artists.service';
import type { CreateArtistDto } from './dto/create-artists.dto';
import type { UpdateArtistDto } from './dto/update-artists.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new artist',
    description: 'Creates a new artist with the provided information',
  })
  @ApiCreatedResponse({
    description: 'Artist created successfully',
    type: Artist,
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Peso pluma',
      country: 'Mexico',
      debut_year: 2019,
      created_at: '2024-01-15T10:30:00.000Z',
      updated_at: '2024-01-15T10:30:00.000Z',
    },
  })
  @ApiBody({
    description: 'Artist data for creation',
    examples: {
      'bad-bunny-example': {
        summary: 'Bad Bunny Example',
        description: 'Another example of creating an artist',
        value: {
          name: 'Bad bunny',
          country: 'Puerto Rico',
          debut_year: 2016,
        },
      },
    },
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description:
      'Retrieves all artists. Can be filtered by country or debut year.',
  })
  @ApiQuery({
    name: 'country',
    required: false,
    description: 'Filter artists by country',
    example: 'Mexico',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Filter artists by debut year',
    example: '2019',
  })
  @ApiOkResponse({
    description: 'List of artists retrieved successfully',
    type: [Artist],
  })
  findAll(@Query('country') country?: string, @Query('year') year?: string) {
    if (country) {
      return this.artistsService.findByCountry(country);
    }
    if (year) {
      return this.artistsService.findByDebutYear(parseInt(year));
    }
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get artist by ID',
    description: 'Retrieves a specific artist by their unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist unique identifier (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiOkResponse({
    description: 'Artist found successfully',
    type: Artist,
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update artist',
    description:
      'Updates an existing artist with new information. All fields are optional.',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist unique identifier (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiBody({
    description: 'Artist data for update (all fields optional)',
    examples: {
      'update-name-only': {
        summary: 'Update Name Only',
        description: 'Update only the artist name',
        value: {
          name: 'Peso pluma (Updated)',
        },
      },
      'update-country-and-year': {
        summary: 'Update Country and Year',
        description: 'Update country and debut year',
        value: {
          country: 'Mexico',
          debut_year: 2020,
        },
      },
      'full-update': {
        summary: 'Full Update',
        description: 'Update all fields at once',
        value: {
          name: 'Peso pluma',
          country: 'Mexico',
          debut_year: 2019,
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Artist updated successfully',
    type: Artist,
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format or invalid input data',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete artist',
    description:
      'Permanently removes an artist from the system. This action cannot be undone.',
  })
  @ApiParam({
    name: 'id',
    description: 'Artist unique identifier (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    schema: { type: 'string', format: 'uuid' },
  })
  @ApiOkResponse({
    description: 'Artist deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Artist deleted successfully' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Artist not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.remove(id);
  }
}
