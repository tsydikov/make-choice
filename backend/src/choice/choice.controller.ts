import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ChoiceService} from "./choice.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ChoiceModel} from "./choice.model";
import {MakeChoiceDto} from "./dto/make-choice.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Choice')
@Controller('choice')
export class ChoiceController {
    constructor(private choiceService: ChoiceService) {}
    @ApiOperation({summary: 'Make your choice'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: ChoiceModel})
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() choiceDto: MakeChoiceDto) {
        return this.choiceService.makeChoice(choiceDto)
    }

    @ApiOperation({summary: 'Get all choices for user'})
    @ApiResponse({status: 200, type: [ChoiceModel]})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/:userId')
    getByUserId(@Param('userId') userId: number) {
        return this.choiceService.getAllChoicesForUser(userId)
    }

    @ApiOperation({summary: 'Get today choice for user'})
    @ApiResponse({status: 200, type: ChoiceModel})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/today/:userId')
    getOneByUserId(@Param('userId') userId: number) {
        return this.choiceService.getTodayChoiceForUser(userId)
    }

}
