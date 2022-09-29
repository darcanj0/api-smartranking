import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category-dto';
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

  private async checkIfCategoryExistsById(id: string): Promise<Category> {
    const categoryFound = await this.categoryModel.findOne({ id }).exec();
    if (categoryFound) {
      throw new NotFoundException(`Category with id ${id} does not exist`);
    }
    return categoryFound;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category } = createCategoryDto;
    await this.checkIfCategoryExistsByName(category);
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findCategoryById(categoryId: string): Promise<Category> {
    return this.checkIfCategoryExistsById(categoryId);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.checkIfCategoryExistsById(id);
    await this.categoryModel
      .findOneAndUpdate({ id }, { $set: updateCategoryDto })
      .exec();
  }
}
