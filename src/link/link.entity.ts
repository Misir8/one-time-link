import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  value: string;

  @Column({ default: true })
  isActive: boolean;
}
