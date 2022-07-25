import { Module } from '@nestjs/common';
import { CategoriesService } from '@/categories/services/categories.service';
import { CategoriesController } from '@/categories/controllers/categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema, Categories } from '@/categories/schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
    ]),
  ],
  providers: [
    CategoriesService
  ],
  controllers: [
    CategoriesController
  ]
})
export class CategoriesModule {}
