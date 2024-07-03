import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkResponseDto } from './dto/link-response.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async create(@Body('value') value: string): Promise<LinkResponseDto> {
    return this.linkService.create(value);
  }

  @Get(':id')
  async get(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<LinkResponseDto> {
    return this.linkService.get(id);
  }
}
