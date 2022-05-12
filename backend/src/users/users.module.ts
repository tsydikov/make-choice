import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./users.model";
import {RoleModel} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([UserModel, RoleModel, UserRoles, UserModel]),
      RolesModule,
      forwardRef(() => AuthModule),
  ],
    exports: [
        UsersService,

    ]
})
export class UsersModule {}
