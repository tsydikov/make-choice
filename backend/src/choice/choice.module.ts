import {forwardRef, Module} from '@nestjs/common';
import { ChoiceController } from './choice.controller';
import { ChoiceService } from './choice.service';
import {ChoiceModel} from "./choice.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../users/users.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [ChoiceController],
  providers: [ChoiceService],
  imports: [
    SequelizeModule.forFeature([UserModel, ChoiceModel]),
    forwardRef(() => AuthModule),
  ]
})
export class ChoiceModule {}
