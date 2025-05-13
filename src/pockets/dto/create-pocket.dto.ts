import { IsNumber, IsString } from "class-validator";

export class CreatePocketDto {
            @IsString()
            name: string;
          
            @IsString()
            description: string;
          
            @IsNumber()
            order: number;
}
