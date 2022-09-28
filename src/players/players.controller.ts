import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    this.playersService.createUpdatePlayer(createPlayerDto);
  }

  @Get()
  async findAllPlayers(
    @Query('email', PlayersValidationParamsPipe) email: string,
  ): Promise<Player[] | Player> {
    if (email) {
      return this.playersService.findPlayerByEmail(email);
    } else {
      return this.playersService.findAllPlayers();
    }
  }

  @Delete()
  async deletePlayer(
    @Query('email', PlayersValidationParamsPipe) email: string,
  ): Promise<void> {
    return this.playersService.deletePlayer(email);
  }
}
