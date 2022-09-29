import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('category') private readonly categoryModel: Model<Category>,
  ) {}

  private async checkIfCategoryExistsByName(
    category: string,
  ): Promise<void | HttpException> {
    const categoryFound = await this.categoryModel.findOne({ category }).exec();
    if (categoryFound) {
      throw new BadRequestException(
        `Category with name ${category} already exists`,
      );
    }
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category } = createCategoryDto;
    await this.checkIfCategoryExistsByName(category);
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  findAllCategories(): Category[] | Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
