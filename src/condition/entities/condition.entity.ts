import { SubPocket } from "src/sub-pockets/entities/sub-pocket.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Condition {
        @PrimaryGeneratedColumn('uuid')
        id: string;
      
        @Column()
        fied: string;
      
        @Column()
        type: number |string;
      
        @Column()
        operator: string;

        @Column()
        value: string;

        @OneToOne(() => SubPocket, (subPocket) => subPocket.condition , { onDelete: 'CASCADE' })
        subPockets: SubPocket;
}
