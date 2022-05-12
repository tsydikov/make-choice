import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 'user', description: 'worker'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;
    @ApiProperty({example: '1', description: 'User ID'})
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}