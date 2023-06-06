import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, email: 'mambo@gmail.com', name: 'Mambo' },
    { id: 2, email: 'dumbo@gmail.com', name: 'Dumbo' },
  ];

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
