import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'Tsudikov Kirill', description: 'surname and name'})
    @IsString({message: 'must be string'})
    readonly login: string;
    @ApiProperty({example: '12345', description: 'password'})
    @IsString({message: 'must be string'})
    @Length(4,16,{message: 'must be min 4 and max 16 symbols'})
    readonly password: string;

}