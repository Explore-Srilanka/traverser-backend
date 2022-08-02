import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from '@/categories/services/categories.service';

@Injectable()
export class CategoriesSeed {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Command({ command: 'create:categories', describe: 'create categories' })
  async create() {
    const categories = [
      'Hiking',
      'Wildlife',
      'Diving',
      'Surfing',
      'Whale Watching',
    ];
    await this.categoriesService.deleteAll();
    for (let index = 0; index < categories.length; index++) {
      await this.categoriesService.create({
        name: categories[index],
      });
    }
    console.log('create:categories seeds completed');
  }
}
