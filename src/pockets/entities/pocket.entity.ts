import {  SubPocket } from "src/sub-pockets/entities/sub-pocket.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Pocket {
     @PrimaryGeneratedColumn('uuid')
        id: string;
      
        @Column()
        name: string;
      
        @Column()
        
        description: string;
      
        @Column()
        order: number;

        @OneToMany(() => SubPocket, (subPocket) => subPocket.pocket , { onDelete: 'CASCADE' })
        subPockets: SubPocket[];

}
