import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from "@nestjs/common";
import { isEmpty } from "../utils";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryQueryDto } from "./dto/query.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("categories")
export class CategoriesController {

  constructor(
    private readonly categoriesService: CategoriesService) {
  }


  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }


  @Get()
  async findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(isEmpty(query) ? null : query);
  }


  @Get(":id")
  async findOne(@Param("id") id: string, @Query() query: CategoryQueryDto) {
    return this.categoriesService.findOne(id, isEmpty(query) ? null : query);
  }


  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }


  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }

}
