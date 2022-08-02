import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoriesService } from '@/categories/services/categories.service';
import { ResponseTypes } from '@/shared/enums/responseTypes.enum';

@Controller('categories')
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);

  constructor(private categoriesService: CategoriesService) {}

  @Get()
  public async getAll(@Res() response: Response) {
    try {
      const categories = await this.categoriesService.findAll({});
      return response.status(HttpStatus.OK).json({
        type: ResponseTypes.SUCCESS,
        message: 'Categories has been fetched successfully',
        data: categories,
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
      const category = await this.categoriesService.findById(id);
      return response.status(HttpStatus.OK).json({
        type: ResponseTypes.SUCCESS,
        message: 'Category has been fetched successfully',
        data: category,
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
