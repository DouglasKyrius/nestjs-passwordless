import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import PMLStrategy from 'passport-magic-login';
import { AuthService } from './auth.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(PMLStrategy) {
  private readonly logger = new Logger(MagicLoginStrategy.name);

  constructor(private authService: AuthService) {
    super({
      secret: 'my_s3cr3t-k3y',
      jwtOptions: {
        expiresIn: '15000',
      },
      callbackUrl: 'http://localhost:3000/auth/login/callback',
      sendMagicLink: async (destination: string, href: string) => {
        this.logger.debug(`sending email to ${destination} with link ${href}`);
      },
      verify: async (payload, callback) =>
        callback(null, this.validate(payload)),
    });
  }

  validate(payload: { destination: string }) {
    const user = this.authService.validateUser(payload.destination);
    return user;
  }
}
