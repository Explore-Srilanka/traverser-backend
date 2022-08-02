import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '@/config/configuration';
import { CategoriesModule } from '@/categories/categories.module';
import { PlacesModule } from '@/places/places.module';
import { ReviewsModule } from '@/reviews/reviews.module';
import { UtilModule } from '@/util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
      cache: false,
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('queue.redis.host'),
          port: configService.get('queue.redis.post'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database.mongodb.host'),
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    PlacesModule,
    ReviewsModule,
    UtilModule,
  ],
  providers: [],
})
export class AppModule {}
