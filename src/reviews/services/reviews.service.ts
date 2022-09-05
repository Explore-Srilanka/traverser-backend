import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from '@/reviews/dtos/create-review.dto';
import { UpdateReviewDto } from '@/reviews/dtos/update-review.dto';
import { PaginationDto } from '@/reviews/dtos/pagination.dto';
import { Reviews } from '@/reviews/schemas/reviews.schema';
import { Places } from '@/places/schemas/places.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name)
    private readonly reviewsModel: Model<Reviews>,
    @InjectModel(Places.name) 
    private readonly placesModel: Model<Places>
  ) {}

  public async findAll(paginationDto: PaginationDto) {
    const { limit, offset, search } = paginationDto;
    return await this.reviewsModel
      .find(search)
      .skip(offset)
      .limit(limit)
      .exec();
  }

  public async findById(id: string) {
    return await this.reviewsModel.findById(id);
  }

  public async create(createReviewDto: CreateReviewDto) {
    const review = new this.reviewsModel(createReviewDto);
    const place = await this.placesModel.findById(createReviewDto.place_id);
    place.reviews.push(review._id);
    await place.save();
    return await review.save();
  }

  public async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewsModel.findByIdAndUpdate(
      { _id: id },
      updateReviewDto,
    );
    return review;
  }

  public async delete(id: string) {
    const review = await this.reviewsModel.findByIdAndRemove(id);
    if(review){
      await this.placesModel.updateOne({_id : review.place_id}, { $pullAll: { reviews : [review._id]  }}, { safe: true, upsert: true });
    }
    return review;
  }

}
