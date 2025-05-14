import { Note } from "src/note/entities/note.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
  }

  @Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    age: number;
  
    @Column()
    maritalStatus: boolean;
  
    @Column()
    smokes: boolean;

    @Column()
    country: string;

    @Column()
    state: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
      })
    role: UserRole

    @OneToMany(() =>  Note, (note) => note.user , { onDelete: 'CASCADE' })
    @JoinColumn()
    notes: Note[];

}
