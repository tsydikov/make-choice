import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {UserModel} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {RoleModel} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { ChoiceModule } from './choice/choice.module';
import {ChoiceModel} from "./choice/choice.model";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
           envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [UserModel, RoleModel, UserRoles, ChoiceModel],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        ChoiceModule,
    ]
})
export class AppModule {}