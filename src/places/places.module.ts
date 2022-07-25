import { Module } from '@nestjs/common';
import { PlacesController } from '@/places/controllers/places.controller';
import { PlacesService } from '@/places/services/places.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PlacesSchema,
  Places,
} from '@/places/schemas/places.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Places.name, 
        schema: PlacesSchema 
      },
    ]),
  ],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule {}
