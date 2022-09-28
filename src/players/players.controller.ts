import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-user.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param('_id') _id: string,
  ): Promise<void> {
    return this.playersService.update(_id, updatePlayerDto);
  }

  @Get()
  async findAllPlayers(): Promise<Player[] | Player> {
    return this.playersService.findAllPlayers();
  }

  @Get('/:_id')
  async findPlayerById(@Param('_id') _id: string): Promise<Player> {
    return this.playersService.findPlayerById(_id);
  }

  @Delete('/:_id')
  async deletePlayer(@Param('_id') _id: string): Promise<void> {
    return this.playersService.deletePlayer(_id);
  }
}
