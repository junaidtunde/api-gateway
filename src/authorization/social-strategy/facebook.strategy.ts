import { Injectable } from '@nestjs/common';
import { config } from '../../config';

import { use } from 'passport';
import * as FacebookTokenStrategy from 'passport-facebook-token';

@Injectable()
export class FacebookStrategy {
  constructor() {
    this.init();
  }
  init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: config.facebookAppId,
          clientSecret: config.facebookAppSecret,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const { name, emails, id } = profile;
          const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            facebookId: id,
          };

          return done(null, user);
        },
      ),
    );
  }
}
