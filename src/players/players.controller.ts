import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    const { email, name, phoneNumber } = createPlayerDto;
    return JSON.stringify(`
    {
      "name": ${name},
      "phoneNumber": ${phoneNumber},
      "email": ${email},
    }
    `);
  }
}
