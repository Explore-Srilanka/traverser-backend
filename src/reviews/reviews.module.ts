import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsService } from '@/reviews/services/reviews.service';
import { ReviewsController } from '@/reviews/controllers/reviews.controller';
import {
  ReviewsSchema,
  Reviews,
} from '@/reviews/schemas/reviews.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Reviews.name, 
        schema: ReviewsSchema 
      },
    ]),
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
