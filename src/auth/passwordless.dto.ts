import { IsEmail } from 'class-validator';

export class PasswordlessLoginDTO {
  @IsEmail()
  destination: string;
}
