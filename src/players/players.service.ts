import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('player') private readonly playerModel: Model<Player>,
  ) {}

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (playerFound) {
      return this.update(createPlayerDto);
    } else {
      return this.create(createPlayerDto);
    }
  }

  findAllPlayers = (): Promise<Player[]> => {
    return this.playerModel.find().exec();
  };

  findPlayerByEmail = async (email: string): Promise<Player> => {
    const playerFound = await this.playerModel.findOne({ email });
    if (!playerFound) {
      throw new NotFoundException(`Player with email ${email} was not found`);
    }
    return playerFound;
  };

  deletePlayer = async (email: string): Promise<any> => {
    return this.playerModel.deleteOne({ email }).exec();
  };

  private async update(createPlayerDto: CreatePlayerDto): Promise<Player> {
    await this.findPlayerByEmail(createPlayerDto.email);
    return this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDto.email },
        { $set: createPlayerDto },
      )
      .exec();
  }

  private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto);
    return createdPlayer.save();
  }
}
