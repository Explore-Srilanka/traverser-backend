import { Controller , Get, Res, HttpStatus, Param, Logger} from '@nestjs/common';
import {Response} from 'express';
import { PlacesService } from '@/places/services/places.service';
import { ResponseTypes } from '@/shared/enums/responseTypes.enum';

@Controller('places')
export class PlacesController {

    private readonly logger = new Logger(PlacesController.name);

    constructor(private placesService: PlacesService) {
  
    }

    @Get()
    public async getAll(@Res() response: Response) {
      try {
        const places = await this.placesService.findAll({});
        return response.status(HttpStatus.OK).json({
            type    :  ResponseTypes.SUCCESS, 
            message : 'Places has been fetched successfully',
            data    :  places
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
