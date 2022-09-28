import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-user.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('player') private readonly playerModel: Model<Player>,
  ) {}

  private async checkIfPlayerExistsById(id: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ id: id }).exec();
    if (!playerFound) {
      throw new BadRequestException(`Player with id ${id} does not exist`);
    }
    return playerFound;
  }

  private async checkIfPlayerAlreadyExistsByEmail(
    email: string,
  ): Promise<void | HttpException> {
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (playerFound) {
      throw new BadRequestException(
        `Player with email ${email} already exists`,
      );
    }
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    await this.checkIfPlayerAlreadyExistsByEmail(email);
    const createdPlayer = new this.playerModel(createPlayerDto);
    return createdPlayer.save();
  }

  findAllPlayers = (): Promise<Player[]> => {
    return this.playerModel.find().exec();
  };

  findPlayerById = async (id: string): Promise<Player> => {
    return this.checkIfPlayerExistsById(id);
  };

  deletePlayer = async (id: string): Promise<any> => {
    await this.checkIfPlayerExistsById(id);
    return this.playerModel.deleteOne({ id }).exec();
  };

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    await this.checkIfPlayerExistsById(id);
    await this.playerModel
      .findOneAndUpdate({ id }, { $set: updatePlayerDto })
      .exec();
  }
}
