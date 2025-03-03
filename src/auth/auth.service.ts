import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';

    private saveToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
        , private readonly http: HttpService) { }


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

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
            tap((res: any) => {
                this.saveToken(res.access_token);
                localStorage.setItem('role', res.user.role);
            })
        );
    }

}
