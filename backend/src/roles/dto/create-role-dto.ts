import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {
    @ApiProperty({example: 'user', description: 'role name'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;
    @ApiProperty({example: 'worker', description: 'role description'})
    @IsString({message: "Должно быть строкой"})
    readonly description: string;
}