import { Module, Next } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { PlacesController } from '@/places/controllers/places.controller';
import { PlacesService } from '@/places/services/places.service';
import { CategoriesModule } from '@/categories/categories.module';
import { PlacesSeed } from '@/places/seeds/places.seed';
import { PlacesSchema, Places } from '@/places/schemas/places.schema';
import { CategoriesSchema, Categories } from '@/categories/schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Categories.name,
        schema: CategoriesSchema
      },
      {
        name: Places.name,
        schema: PlacesSchema
        // useFactory: () => {
        //   const schema = PlacesSchema;
        //   schema.pre<Places>('save', async function () {
        //     const place = this;
        //     this.slug = this.name.split(' ').join('-');
        //   });
        //   return schema;
        // },
      },
    ]),
    CategoriesModule,
    CommandModule,
  ],
  controllers: [PlacesController],
  providers: [PlacesSeed, PlacesService],
})
export class PlacesModule {}
