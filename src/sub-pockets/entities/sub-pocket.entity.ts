import { MinLength } from "class-validator";
import { Condition } from "src/condition/entities/condition.entity";
import { Note } from "src/note/entities/note.entity";
import { Pocket } from "src/pockets/entities/pocket.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class SubPocket {
    @PrimaryGeneratedColumn('uuid')
        id: string;
      
        @Column()
        name: string;
      
        @Column()
        @MinLength(5, { message: 'Description must be at least 5 characters' })
        description: string;
      
        @Column()
        order: number;

        @ManyToOne(() =>  Pocket, (pocket) => pocket.subPockets , { onDelete: 'CASCADE' })
        pocket: Pocket;

        @OneToMany(() => Note, (Note) => Note.subPockets , { onDelete: 'CASCADE' })
        notes: Note[];

        @OneToOne(() => Condition, (condition) => condition.subPockets , { onDelete: 'CASCADE' })
        condition: SubPocket;

}
