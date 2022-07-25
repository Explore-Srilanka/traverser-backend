import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from '@/places/dtos/create-place.dto';
import { UpdatePlaceDto } from '@/places/dtos/update-place.dto';
import { Places } from '@/places/schemas/places.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlacesService {

    constructor(
        @InjectModel(Places.name)
        private readonly placesModel: Model<Places>,
    ) {}

    public async findAll() {
        return await this.placesModel.find({});
      }
    
      public async findById(id: string) {
        return await this.placesModel.findById(id);
      }
    
      public async create(createPlaceDto: CreatePlaceDto) {
        const place = new this.placesModel(createPlaceDto);
        return await place.save();
      }
    
      public async update(id: string, updatePlaceDto: UpdatePlaceDto) {
        const place = await this.placesModel.findByIdAndUpdate(
          { _id: id },
          updatePlaceDto,
        );
        return place;
      }
    
      public async delete(id: string) {
        const place = await this.placesModel.findByIdAndRemove(id);
        return place;
      }
}
