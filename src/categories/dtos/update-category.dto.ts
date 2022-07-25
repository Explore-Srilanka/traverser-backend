import {IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
    id?: string
    
    @IsString()
    @IsNotEmpty()
    name: string
}