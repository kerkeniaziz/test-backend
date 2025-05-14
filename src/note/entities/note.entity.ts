import { SubPocket } from "src/sub-pockets/entities/sub-pocket.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
         @PrimaryGeneratedColumn('uuid')
            id: string;
          
            @Column({ nullable: true })
            description: string;
    
            @ManyToOne(() =>  SubPocket, (SubPocket) => SubPocket.notes , { onDelete: 'CASCADE' })
            @JoinColumn()
            subPocket: SubPocket;

            @ManyToOne(() =>  User, (user) => user.notes , { onDelete: 'CASCADE' })
            @JoinColumn()
            user: User;
}
