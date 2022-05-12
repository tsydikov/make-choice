import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class MakeChoiceDto {
    @ApiProperty({example: '1', description: 'User ID'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId:number;
    @ApiProperty({example: 'work all day', description: 'work day description'})
    @IsString({message: "Должно быть строкой"})
    readonly description:string;
}