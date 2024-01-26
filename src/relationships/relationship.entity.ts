import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: number;

  @Column()
  store: number;
}
