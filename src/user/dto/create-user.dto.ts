import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;    


    @IsString()
    lastName: string;

    @IsNumber()
    age: number;

    @IsBoolean()
    maritalStatus: boolean;

    @IsBoolean()
    smokes: boolean;

    @IsString()
    country: string;

    @IsString()
    state: string;
}
