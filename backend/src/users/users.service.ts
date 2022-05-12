import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserModel} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {RoleModel} from "../roles/roles.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel,
                private rolesService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.rolesService.getRoleByValue("admin")
        await user.$set('roles', [role.roleId])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll(
            {
                include: [
                    {model: RoleModel, as: 'roles'}
                ]
            })
        return users
    }

    async getUserByLogin(login: string) {
        const user = this.userRepository.findOne({where: {login}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.roleId);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }
}
