import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { LinkResponseDto } from './dto/link-response.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async create(value: string): Promise<LinkResponseDto> {
    const existLink = await this.linkRepository
      .createQueryBuilder('link')
      .where('LOWER(link.value) = LOWER(:value)', { value })
      .getOne();

    if (existLink) {
      throw new BadRequestException('Link already exist');
    }

    const link = new Link();
    link.value = value;
    await this.linkRepository.save(link);
    return link;
  }

  async get(id: string): Promise<LinkResponseDto> {
    const link = await this.linkRepository.findOne({ where: { id } });
    if (!link || !link.isActive) {
      throw new NotFoundException('Link not found or already used');
    }
    link.isActive = false;
    await this.linkRepository.save(link);
    return link;
  }
}
