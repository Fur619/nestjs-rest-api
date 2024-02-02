import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "Xavi",
            email: "xavi@fcbarcelona.com",
            role: "ADMIN"
        },
        {
            id: 2,
            name: "Zidane",
            email: "zidane@real.com",
            role: "ADMIN"
        }, {
            id: 3,
            name: "Ineasta",
            email: "ineasta@fcbarcelona.com",
            role: "INTERN"
        }, {
            id: 4,
            name: "Sergio",
            email: "sergio@fcbarcelona.com",
            role: "INTERN"
        }, {
            id: 5,
            name: "roberto",
            email: "roberto@fcbarcelona.com",
            role: "INTERN"
        },
    ]

    findAll(role?: "INTERN" | "ADMIN") {
        if (role) {
            const users = this.users.filter(user => user.role === role)
            if (!users.length) throw new NotFoundException("No User Exist with this role!")
            return users
        }
        return this.users
    }

    findOne(id: number) {

        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException("User Not Found!")
        return user
    }

    create(createUserDto: CreateUserDto) {
        const newUser = {
            id: this.users.length,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removeUser = this.findOne((id));
        this.users = this.users.filter(user => user.id !== id)
        return removeUser
    }

}
