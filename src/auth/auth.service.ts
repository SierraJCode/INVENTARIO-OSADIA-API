import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }

    async register(username: string, password: string, role: 'admin' | 'bartender') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({ username, password: hashedPassword, role });
        return await user.save();
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ username }).exec();
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }
}
