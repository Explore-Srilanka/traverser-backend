import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from '@/categories/dtos/create-category.dto';
import { UpdateCategoryDto } from '@/categories/dtos/update-category.dto';
import { Categories } from '@/categories/schemas/categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private readonly categoriesModel: Model<Categories>,
  ) {}

  public async findAll(query: object) {
    return await this.categoriesModel.find(query);
  }

  public async findById(id: string) {
    return await this.categoriesModel.findById(id);
  }

  public async findByParameter(query: object){
    return await this.categoriesModel.findOne(query);
  }

  public async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoriesModel(createCategoryDto);
    return await category.save();
  }

  public async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesModel.findByIdAndUpdate(
      { _id: id },
      updateCategoryDto,
    );
    return category;
  }

  public async deleteOne(id: string) {
    const category = await this.categoriesModel.findByIdAndRemove(id);
    return category;
  }

  public async deleteAll(){
     return  await this.categoriesModel.deleteMany();
  }
}
