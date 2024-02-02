import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get() // Get users
    findAll(@Query("role") role?: "INTERN" | "ADMIN") {
        return this.usersService.findAll(role)
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post()
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Patch(":id")
    updateUser(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(":id")
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }

}
