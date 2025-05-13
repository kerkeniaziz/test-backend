import { SubPocket } from "src/sub-pockets/entities/sub-pocket.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Condition {
        @PrimaryGeneratedColumn('uuid')
        id: string;
      
        @Column()
        field: string;
      
        @Column()
        type: string ;
      
        @Column()
        operator: string;

        @Column()
        value: string;

        @OneToOne(() => SubPocket, (subPocket) => subPocket.condition , { onDelete: 'CASCADE' })
        @JoinColumn()
        subPockets: SubPocket;
}
