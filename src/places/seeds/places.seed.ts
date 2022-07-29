import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PlacesService } from '@/places/services/places.service';
import { CategoriesService } from '@/categories/services/categories.service';

@Injectable()
export class PlacesSeed {
constructor(
    private readonly placesService: PlacesService,
    private readonly categoriesService: CategoriesService,
) { }

    @Command({ command: 'create:places', describe: 'create places'})
    async create() {
        await this.placesService.deleteAll();
        const places = await this.getMockPlaces();
        for (let index = 0; index < places.length; index++) {
            const categories = await this.getRandomCategory();
            await this.placesService.create(
                {
                    'name'        : places[index]['name'],
                    'latitude'    : places[index]['latitude'],
                    'longitude'   : places[index]['longitude'],
                    'description' : places[index]['description'],
                    'image'       : places[index]['image'],
                    'category_id' : categories[0]._id
                }
            );
        }
        console.log('create:places seeds completed');
    }

    public async getMockPlaces(){
        const places = [
            {
                'name' : 'Coconut Tree Hill',
                'latitude' : '5.93333',
                'longitude' : '80.46828',
                'description' : 'Having made its way to almost every traveller’s Instagram profile when they visit Mirissa, the Coconut Tree Hill is a must-do when you’re in Mirissa. The Coconut Tree Hill is a private coconut estate with a nearby temple set on a high cliff overlooking the glistening waters of the Indian Ocean and the untouched stretch of golden beach. Located in proximity to the town, the hill can be accessed throughout the d',
                'image': 'https://d2r2v0jxjsbm0p.cloudfront.net/2020/12/coconut-1.jpg',
            },
            {
                'name' : 'Peacock Hill',
                'latitude' : '7.085277',
                'longitude' : '80.632722',
                'description' : 'If you are an avid hiker and hungry for the best panoramic views, Monaragala also known as Peacock Hill is definitely the place to be. Located just 45 mins away from our property, the peak of this hill is about 200 m above the city of Pussellawa and is an easy hike to conquer.',
                'image': 'https://d2r2v0jxjsbm0p.cloudfront.net/2022/05/peacok-1000x900-1-1.jpg',
            },
            {
                'name' : 'Ramboda Falls',
                'latitude' : '7.05561350333',
                'longitude' : '80.6983009233',
                'description' : 'Cascading down two tiers of rock is the mesmerising sight of stark white water-dropping 358 ft into a rocky pool. This is the 11th highest waterfall in Sri Lanka and is definitely worth seeing.',
                'image': 'https://d2r2v0jxjsbm0p.cloudfront.net/2022/05/ramboda-1000x900-2.jpg',
            },
            {
                'name' : 'Galle Dutch Fort Tour',
                'latitude' : '6.028624',
                'longitude' : '80.216797',
                'description' : 'The story of the Galle Dutch Fort; a UNESCO World Heritage Site reverberates through every traveller’s photos and captions',
                'image': 'https://d2r2v0jxjsbm0p.cloudfront.net/2020/10/Galle-fort-02.jpg',
            },
            {
                'name' : 'Udawalawe Elephant Sanctuary',
                'latitude' : '80.8886114',
                'longitude' : '6.4381426',
                'description' : 'Embark on a thrilling wildlife safari in Udawalawe National Park and be prepared for an adventure of a lifetime. Known to be the best place to spot Sri Lanka’s most treasured giants',
                'image': 'https://d2r2v0jxjsbm0p.cloudfront.net/2020/10/Udawalawe-elephant-sanctuary-1.jpg',
            }
        ];
        return places;
    }

    public async getRandomCategory(){
       const categoriesArray = await this.categoriesService.findAll({});
        let shuffeledArray = [];
        while (shuffeledArray.length <= categoriesArray.length) {
            for (let _ of categoriesArray) {
                const randomNumb = Math.floor(Math.random() * categoriesArray.length);
                if (!shuffeledArray.includes(categoriesArray[randomNumb])) {
                    shuffeledArray.push(categoriesArray[randomNumb]);
                }
            }
            if (shuffeledArray.length === categoriesArray.length)
                break;
        }
        return shuffeledArray;
    } 

    
}