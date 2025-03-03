import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async findByUsername(username: string) {
        return this.userModel.findOne({ username }).exec();
    }

    async createUser(userData: CreateUserDto) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = new this.userModel({
            ...userData,
            password: hashedPassword, // Guardar la contraseña encriptada
        });

        return newUser.save();
    }
}
