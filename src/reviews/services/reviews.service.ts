import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from '@/reviews/dtos/create-review.dto';
import { UpdateReviewDto } from '@/reviews/dtos/update-review.dto';
import { Reviews } from '@/reviews/schemas/reviews.schema';

@Injectable()
export class ReviewsService {
    
    constructor(
        @InjectModel(Reviews.name)
        private readonly reviewsModel: Model<Reviews>,
    ) {}

    public async findAll() {
        return await this.reviewsModel.find({});
      }
    
    public async findById(id: string) {
    return await this.reviewsModel.findById(id);
    }

    public async create(createReviewDto: CreateReviewDto) {
    const review = new this.reviewsModel(createReviewDto);
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
    return review;
    }
}
