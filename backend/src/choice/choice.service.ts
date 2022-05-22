import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MakeChoiceDto} from "./dto/make-choice.dto";
import {InjectModel} from "@nestjs/sequelize";
import {ChoiceModel} from "./choice.model";

@Injectable()
export class ChoiceService {
    constructor(@InjectModel(ChoiceModel) private choiceRepository: typeof ChoiceModel) {
    }

    async makeChoice(dto: MakeChoiceDto) {
        const choicesFromDB = await this.choiceRepository.findOne(
            {
                where: {userId: dto.userId},
                order: [['createdAt', 'DESC']]
            },
        )
        if (choicesFromDB && new Date(choicesFromDB.createdAt).getDate() === new Date().getDate()) {
            throw new HttpException('You have make choice today already', HttpStatus.BAD_REQUEST);
        }
        const choice = await this.choiceRepository.create(dto)
        return choice
    }

    async getAllChoicesForUser(userId: number) {
        const choices = await this.choiceRepository.findAll({where: {userId}})
        if (!choices) {
            throw new HttpException('No choice for this user', HttpStatus.NOT_FOUND);
        }
        return choices;
    }

    async getTodayChoiceForUser(userId: number) {
        const choice = await this.choiceRepository.findOne(
            {
                where: {userId},
                order: [['createdAt', 'DESC']]
            },
        )
        if (!choice || new Date(choice.createdAt).getDate() !== new Date().getDate()) {
            throw new HttpException('No choice today', HttpStatus.NOT_FOUND);
        }
        return choice;
    }

    async deleteAllChoicesForUser(userId: number) {
        await this.choiceRepository.destroy({where:{userId}})
    }

}
