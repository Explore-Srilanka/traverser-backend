import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { CategoriesSeed } from '@/categories/seeds/categories.seed';
import { CategoriesService } from '@/categories/services/categories.service';
import { CategoriesController } from '@/categories/controllers/categories.controller';
import {
  CategoriesSchema,
  Categories,
} from '@/categories/schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Categories.name,
        schema: CategoriesSchema,
      },
    ]),
    CommandModule,
  ],
  providers: [CategoriesSeed, CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
