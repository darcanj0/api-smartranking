import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];
  createUpdatePlayer(createPlayerDto: CreatePlayerDto): void {
    const { email } = createPlayerDto;
    const playerFound = this.players.find((player) => player.email === email);
    if (playerFound) {
      return this.update(playerFound, createPlayerDto);
    } else {
      return this.create(createPlayerDto);
    }
  }

  findAllPlayers = (): Player[] => {
    return this.players;
  };

  findPlayerByEmail = (email: string): Player => {
    const playerFound = this.players.find((player) => player.email === email);
    if (!playerFound)
      throw new NotFoundException(`player with email: ${email} was not found`);
    return playerFound;
  };

  deletePlayer = (email: string): void => {
    const playerFound = this.players.find((player) => player.email === email);
    if (!playerFound)
      throw new NotFoundException(`player with email: ${email} was not found`);
    this.players = this.players.filter(
      (player) => player.email !== playerFound.email,
    );
  };

  private update(player: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto;
    player.name = name;
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { email, name, phoneNumber } = createPlayerDto;
    const player: Player = {
      _id: uuidv4(),
      email,
      name,
      phoneNumber,
      profilePic: '',
      ranking: 'A',
      rankingPosition: 1,
    };
    this.players.push(player);
    this.logger.log(`player: ${JSON.stringify(player)}`);
  }
}
