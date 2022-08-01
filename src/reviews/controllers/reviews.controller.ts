import { Body, Controller, HttpStatus, Post, Res , Logger, Get, Param, Delete} from '@nestjs/common';
import {Response} from 'express';
import { CreateReviewDto } from '@/reviews/dtos/create-review.dto';
import { ReviewsService } from '@/reviews/services/reviews.service';
import { ResponseTypes } from '@/shared/enums/responseTypes.enum';

@Controller('reviews')
export class ReviewsController {

    private readonly logger = new Logger(ReviewsController.name);

    constructor(private readonly reviewsService: ReviewsService){
        
    }

	@Post()
	public async create(@Res() response : Response, @Body() createReviewDto: CreateReviewDto){
        try {
           const review = await this.reviewsService.create(createReviewDto);
           return response.status(HttpStatus.OK).json({
               type    :  ResponseTypes.SUCCESS, 
               message : 'Review has been created successfully',
               data    :  review
           });
        } catch (error) {
            this.logger.log(error); 
            return response.status(HttpStatus.BAD_REQUEST).json({
                type    :  ResponseTypes.ERROR, 
                message : 'Something went wrong, Please try again later',
                data    :  null
            });
        }
	}

    @Get('/places/:id')
    public async getById(@Res() response: Response, @Param('id') id: string) {
      try {
        const reviews = await this.reviewsService.findAll({'place_id' : id});
        return response.status(HttpStatus.OK).json({
            type    :  ResponseTypes.SUCCESS, 
            message : 'Reviews has been fetched successfully',
            data    :  reviews
        });
      } catch (error) {
          this.logger.log(error); 
          return response.status(HttpStatus.BAD_REQUEST).json({
              type    :  ResponseTypes.ERROR, 
              message : 'Something went wrong, Please try again later',
              data    :  null
          });
      }
    }

    @Delete('/:id')
    public async delete(@Res() response: Response, @Param('id') id: string) {
      try {
        const review = await this.reviewsService.delete(id);
        return response.status(HttpStatus.OK).json({
            type    :  ResponseTypes.SUCCESS, 
            message : 'Reviews has been deleted successfully',
            data    :  review
        });
      } catch (error) {
          this.logger.log(error); 
          return response.status(HttpStatus.BAD_REQUEST).json({
              type    :  ResponseTypes.ERROR, 
              message : 'Something went wrong, Please try again later',
              data    :  null
          });
      }
    }


}
