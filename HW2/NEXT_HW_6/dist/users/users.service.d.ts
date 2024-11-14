import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    handleCron(): Promise<void>;
    findOne(username: string): Promise<User | undefined>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
}
