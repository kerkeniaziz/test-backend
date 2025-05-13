import { SubPocket } from "src/sub-pockets/entities/sub-pocket.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
         @PrimaryGeneratedColumn('uuid')
            id: string;
          
            @Column({ nullable: true })
            description: string;
    
            @ManyToOne(() =>  SubPocket, (SubPocket) => SubPocket.notes , { onDelete: 'CASCADE' })
            @JoinColumn()
            subPockets: SubPocket;
}
