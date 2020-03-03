import { RequestHandler } from 'express';

import handleErrorMiddleware from '../../../middleware/handle-error';
import User, { IUser } from '../../../models/User';
import { IBodyRequest } from '../../../interfaces/request';
import { Email } from '../../../services/email';
import config from '../../../config/config';

const emailService = new Email(config);

type ISignupRequest = IBodyRequest<IUser>;

let signup: RequestHandler = async (req: ISignupRequest, res) => {
  const { email, password, role } = req.body;

  const user = new User({ email, password, role });
  await user.save();

  const mailOptions = {
    from: config.SMTP_FROM_EMAIL,
    to: email,
    subject: `Welcome`,
    html: `
          <div>
            <h3>Hello: ${email}</h3>
          </div>
        `,
  };
  await emailService.sendSimpleMail(mailOptions);

  res.send(user.toJSON());
};

signup = handleErrorMiddleware(signup);

export default signup;
