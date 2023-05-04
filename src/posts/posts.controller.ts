import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Me } from "../auth/guards/current-user.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { PostQueryDto } from "./dto/query.dto";
import { isEmpty } from "../utils";

@Controller("posts")
export class PostsController {

  constructor(
    private readonly postsService: PostsService) {
  }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Me() { id, email },
    @Body() createPostDto: CreatePostDto) {
    const categories = createPostDto.categories?.map(category => ({ id: category }));
    return this.postsService.create({
      ...createPostDto,
      user: { connect: id },
      categories: { connect: categories } // connect - добавляет!!!
    });
  }


  @Get()
  findAll(@Query() query: PostQueryDto) {
    return this.postsService.findAll(isEmpty(query) ? null : query);
  }


  @Get(":id")
  findOne(@Param("id") id: string, @Query() query: PostQueryDto) {
    return this.postsService.findOne(id, isEmpty(query) ? null : query);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    const categories = updatePostDto.categories?.map(category => ({ id: category }));
    return this.postsService.update(id, {
      ...updatePostDto,
      categories: { set: categories } // set - перезаписывает!!! connect - добавляет!!!
    });
  }


  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postsService.remove(id);
  }

}
