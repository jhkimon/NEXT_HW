import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Board } from '../boards/board.entity';
import { Like } from '../likes/like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Board, (board) => board.user, { cascade: true })
  boards: Board[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
