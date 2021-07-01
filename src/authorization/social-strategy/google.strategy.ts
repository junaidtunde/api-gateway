import { Injectable, Logger } from '@nestjs/common';
import { config } from '../../config';

import { use } from 'passport';
// @ts-ignore
import * as Strategy from 'passport-google-id-token';

@Injectable()
export class GoogleStrategy {
  constructor() {
    this.init();
  }
  init() {
    use(
      new Strategy(
        {
          clientID: config.googleAppId,
        },
        async (profile, googleId, done) => {
          const { given_name, family_name, email } = profile.payload;
          const user = {
            email,
            firstName: given_name,
            lastName: family_name,
            googleId,
          };
          Logger.log(user);
          return done(null, user);
        },
      ),
    );
  }
}
