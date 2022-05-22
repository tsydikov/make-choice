import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import {UserModel} from "../users/users.model";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        await this.usersService.createInitialData()
        const user = await this.validateUser(userDto)
        const token = await this.generateToken(user)
        return {
            ...token,
            userId: user.userId,
            login: user.login,
            roles: user.roles.map(role => role.value),
        }
    }

    async registration(userDto: CreateUserDto) {
        await this.usersService.createInitialData()
        const candidate = await this.usersService.getUserByLogin(userDto.login)
        if (candidate) {
            throw new HttpException('user has registered already', HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.usersService.createUser({...userDto, password: hashedPassword})
        const token = await this.generateToken(user)
        return {
            ...token,
            userId: user.userId,
            login: user.login,
            roles: user.roles.map(role => role.value),

        }
    }

    private async generateToken(user: UserModel) {
        const payload = {login: user.login, userId: user.userId, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByLogin(userDto.login)
        if (!user) {
            throw new UnauthorizedException({ message: 'Login is incorrect'})
        }
        console.log(user)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Login or password is incorrect'})
    }
}
