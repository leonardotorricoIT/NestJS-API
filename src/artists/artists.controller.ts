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
  })
  @ApiBody({
    description: 'Artist data for creation',
    examples: {
      'rock-artist': {
        summary: 'Rock Artist Example',
        description: 'Example of creating a rock artist',
        value: {
          name: 'The Beatles',
          country: 'United Kingdom',
          debut_year: 1960,
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
      'Retrieves all artists with optional filtering by country or debut year',
  })
  @ApiOkResponse({
    description: 'List of artists retrieved successfully',
    type: [Artist],
  })
  @ApiQuery({
    name: 'country',
    required: false,
    description: 'Filter artists by country',
    example: 'United States',
    schema: { type: 'string' },
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Filter artists by debut year',
    example: '1980',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Filtered artists by country',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Artist',
      },
      example: [
        {
          id: 'uuid-example',
          name: 'Madonna',
          country: 'United States',
          debut_year: 1982,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    },
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
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example:
            'Artist with ID 123e4567-e89b-12d3-a456-426614174000 not found',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'string',
          example: 'Validation failed (uuid is expected)',
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
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
    schema: { $ref: '#/components/schemas/UpdateArtistDto' },
    examples: {
      'partial-update': {
        summary: 'Partial Update',
        description: 'Update only specific fields',
        value: {
          name: 'The Beatles (Updated)',
        },
      },
      'full-update': {
        summary: 'Full Update',
        description: 'Update all fields',
        value: {
          name: 'The Beatles',
          country: 'England',
          debut_year: 1962,
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
    description: 'Invalid input data or UUID format',
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
