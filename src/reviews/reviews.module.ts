import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsService } from '@/reviews/services/reviews.service';
import { ReviewsController } from '@/reviews/controllers/reviews.controller';
import { ReviewsSchema, Reviews } from '@/reviews/schemas/reviews.schema';
import { PlacesSchema, Places } from '@/places/schemas/places.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reviews.name,
        schema: ReviewsSchema,
      },
      {
        name: Places.name,
        schema: PlacesSchema,
      },
    ]),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
