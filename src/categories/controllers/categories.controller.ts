import { Controller , Get, Res, HttpStatus, Param} from '@nestjs/common';
import { CategoriesService } from '@/categories/services/categories.service';


@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  public async getAll(@Res() response) {
    const categories = await this.categoriesService.findAll({});
    return response.status(HttpStatus.OK).json(categories);
  }

  @Get('/:id')
  public async getById(@Res() response, @Param('id') id: string) {
    const category = await this.categoriesService.findById(id);
    return response.status(HttpStatus.OK).json(category);
  }
}
