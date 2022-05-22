import {Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "./users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {ValidationPipe} from "../pipes/validation.pipe";
import {AddRoleDto} from "./dto/add-role.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @ApiOperation({summary: 'Create new user'})
    @ApiResponse({status: 200, type: UserModel})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [UserModel]})
    @ApiBearerAuth()
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Get user profile'})
    @ApiResponse({status: 200, type: [UserModel]})
    @ApiBearerAuth()
    @Get('/profile/:login')
    getProfile(@Param('login') login: string) {
        return this.usersService.getProfile(login)
    }

    @ApiOperation({summary: 'Add role'})
    @ApiResponse({status: 200})
    @ApiBearerAuth()
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'delete user profile'})
    @ApiResponse({status: 200, type: [UserModel]})
    @ApiBearerAuth()
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Delete('/:login')
    deleteUser(@Param('login') login: string) {
        return this.usersService.deleteUser(login)
    }
}
