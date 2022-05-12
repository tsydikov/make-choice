import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({ tableName: 'Role'})
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
    @ApiProperty({example: '1', description: 'primary key'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    roleId: number;

    @ApiProperty({example: 'Admin', description: 'uniq role name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value:string;

    @ApiProperty({example: 'Have all access', description: 'Role description'})
    @Column({type: DataType.STRING, allowNull: false})
    description:string;

    @BelongsToMany(() => UserModel, () => UserRoles)
    users: UserModel[];
}