import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class GetCategoryDto {
    @ApiProperty({
        description: "Category ID",
        example: 1,
        type: Number,
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: "Category name",
        example: "Smartphone",
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: "Category description",
        example: "The latest smartphone from Apple",
        type: String,
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: "Category image URL",
        example: "categories/category-image.jpg",
        type: String,
    })
    @IsString()
    image: string;
 
    @ApiHideProperty()
    @Exclude()
    createdAt: Date;

    @ApiHideProperty()
    @Exclude()
    updatedAt: Date;

    constructor(partial: Partial<GetCategoryDto>){
        return Object.assign(this, partial);
    }
}