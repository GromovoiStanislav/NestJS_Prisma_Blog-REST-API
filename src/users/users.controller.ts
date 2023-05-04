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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserQueryDto } from "./dto/query.dto";
import { isEmpty } from "../utils";

@Controller("users")
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  async findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(isEmpty(query) ? null : query);
  }


  @Get(":id")
  findOne(@Param("id") id: string, @Query() query: UserQueryDto) {
    return this.usersService.findOne(id, isEmpty(query) ? null : query);
  }


  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }


  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }

}
