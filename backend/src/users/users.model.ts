import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {RoleModel} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {ChoiceModel} from "../choice/choice.model";

interface UserCreationAttrs {
    login: string;
    password: string;
}

@Table({ tableName: 'User'})
export class UserModel extends Model<UserModel, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'primary key'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    userId: number;
    @ApiProperty({example: 'Tsudikov Kirill', description: 'surname and name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login:string;
    @ApiProperty({example: '12345', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})
    password:string;

    @BelongsToMany(() => RoleModel, () => UserRoles)
    roles: RoleModel[];

    @HasMany(() => ChoiceModel)
    choices: ChoiceModel[]
}