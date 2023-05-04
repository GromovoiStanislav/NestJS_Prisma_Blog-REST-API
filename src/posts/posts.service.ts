import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
  private logger = new Logger(PostsService.name);

  constructor(
    private prismaService: PrismaService) {
  }


  async create(createPostDto: Prisma.PostCreateInput) {
    const result = await this.prismaService.post.create({ data: createPostDto });
    this.logger.log(`Post has been created : ${JSON.stringify(result)}`);
    return result;
  }


  findAll(query?: Prisma.PostInclude) {
    return this.prismaService.post.findMany({ include: { ...query, _count: true } });
  }


  findOne(id: string, query?: Prisma.PostInclude) {
    return this.prismaService.post.findUnique({ where: { id }, include: { ...query, _count: true } });
  }


  async update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    const result = await this.prismaService.post.update({
      where: { id },
      data: updatePostDto
    });
    this.logger.warn(`Post has been updated : ${JSON.stringify(result)}`);
    return result;
  }


  async remove(id: string) {
    const result = await this.prismaService.post.delete({ where: { id } });
    this.logger.warn(`Post has been deleted : ${JSON.stringify(result)}`);
    return result;
  }

}
