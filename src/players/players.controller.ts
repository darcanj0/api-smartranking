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
    @Query('email') email: string,
  ): Promise<Player[] | Player> {
    if (email) {
      return this.playersService.findPlayerByEmail(email);
    } else {
      return this.playersService.findAllPlayers();
    }
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    return this.playersService.deletePlayer(email);
  }
}
