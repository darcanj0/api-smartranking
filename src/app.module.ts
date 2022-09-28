import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
@Module({
  imports: [
    PlayersModule,
    MongooseModule.forRoot(
      'mongodb+srv://daniel:lab0n1Oyx2VBPZKt@cluster0.qytqe9g.mongodb.net/smartranking?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
