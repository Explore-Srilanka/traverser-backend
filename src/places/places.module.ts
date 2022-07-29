import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { PlacesController } from '@/places/controllers/places.controller';
import { PlacesService } from '@/places/services/places.service';
import { CategoriesModule } from '@/categories/categories.module';
import { PlacesSeed } from '@/places/seeds/places.seed';
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
    CategoriesModule,
    CommandModule
  ],
  controllers: [PlacesController],
  providers: [PlacesSeed, PlacesService]
})
export class PlacesModule {}
