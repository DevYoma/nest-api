import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Alice Johnson",
            "email": "alice@example.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Bob Smith",
            "email": "bob@example.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Eva Lee",
            "email": "eva@example.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "David Brown",
            "email": "david@example.com",
            "role": "ADMIN"
        },
        {
            "id": 5,
            "name": "Grace Miller",
            "email": "grace@example.com",
            "role": "ENGINEER"
        }

    ]

    findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER'){
        if(role){
            const rolesArray = this.users.filter(user => user.role === role)
            if(rolesArray.length === 0){
                throw new NotFoundException(`User Role ${role} Not Found`)
            }
            return rolesArray
        }
        return this.users;
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)
        if(!user){
            throw new NotFoundException(`User with id ${id} not found`)
        }

        return user;
    }

    create(createUserDto: CreateUserDto){
        // logic to create id
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        } 

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if (user.id === id){
                return { ...user, ...updateUserDto }
            }
            return user
        })

        return this.findOne(id)
    }
    
    delete(id: number){
        const removedUser = this.findOne(id);
        
        if (!removedUser) {
            return null; 
        }

        this.users = this.users.filter(user => user.id !== id);

        return removedUser;
    }
}
