import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../users/users.model";

interface ChoiceCreationAttrs {
    userId: number;
    description: string;
}
@Table({ tableName: 'Choice'})
export class ChoiceModel extends Model<ChoiceModel, ChoiceCreationAttrs>{
    @ApiProperty({example: '1', description: 'primary key'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    choiceId: number;

    @ApiProperty({example: '1', description: 'user ID'})
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    userId:number;

    @ApiProperty({example: '1', description: 'работаю, фул тайм'})
    @Column({type: DataType.STRING, allowNull: false})
    description:string;

    @BelongsTo(() => UserModel)
    author: UserModel
}