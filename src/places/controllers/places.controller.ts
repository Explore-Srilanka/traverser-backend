import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Logger,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { PlacesService } from '@/places/services/places.service';
import { ResponseTypes } from '@/shared/enums/responseTypes.enum';
import { PaginationDto } from '@/places/dtos/pagination.dto';

@Controller('places')
export class PlacesController {
  private readonly logger = new Logger(PlacesController.name);

  constructor(private placesService: PlacesService) {}

  @Get()
  public async getAll(
    @Res() response: Response,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      const places = await this.placesService.findAll(paginationDto);
      return response.status(HttpStatus.OK).json({
        type: ResponseTypes.SUCCESS,
        message: 'Places has been fetched successfully',
        data: places,
      });
    } catch (error) {
      this.logger.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseTypes.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }

  @Get('/:id')
  public async getById(@Res() response: Response, @Param('id') id: string) {
    try {
      const place = await this.placesService.findById(id);
      return response.status(HttpStatus.OK).json({
        type: ResponseTypes.SUCCESS,
        message: 'Place has been fetched successfully',
        data: place,
      });
    } catch (error) {
      this.logger.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        type: ResponseTypes.ERROR,
        message: 'Something went wrong, Please try again later',
        data: null,
      });
    }
  }
}
