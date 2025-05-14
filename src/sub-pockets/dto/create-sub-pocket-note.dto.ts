
import {IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { SubPocket } from '../entities/sub-pocket.entity';

export class CreateSubPocketNoteDto  {

    @IsString()
    description: string;



    user: User;


    subPocket: SubPocket;

}


