import jwt from 'jsonwebtoken';
import moment from 'moment';
import UserModel from '../models/UserModel';
import FirebaseModel from '../models/FirebaseModel';
import AttemptsModel from '../models/AttemptsModel';

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    let firebase_id;
    let attempt = await AttemptsModel.getAttemptByEmail(email);
    if (attempt.attempts === 0) {
      const body = {
        lock_time: moment().add(5, 'minutes'),
        attempts: attempt.attempts + 1,
      };
      await AttemptsModel.updateAttempt(body, email);
    } else {
      switch (attempt.attempts) {
        case 1: {
          const body = {
            attempts: attempt.attempts + 1,
          };
          await AttemptsModel.updateAttempt(body, email);
          break;
        }
        case 2: {
          const body = {
            attempts: attempt.attempts + 1,
            lock_time: moment().add(5, 'minutes'),
          };
          await AttemptsModel.updateAttempt(body, email);
          break;
        }
        case 3: {
          const body = {
            attempts: attempt.attempts + 1,
          };
          await AttemptsModel.updateAttempt(body, email);
          break;
        }
        case 4: {
          const body = {
            attempts: attempt.attempts + 1,
          };
          await AttemptsModel.updateAttempt(body, email);
          break;
        }
        default: {
          // eslint-disable-next-line no-unused-vars
          const body = {
            attempts: attempt.attempts + 1,
          };
        }
      }
    }
    attempt = await AttemptsModel.getAttemptByEmail(email);
    if (attempt.attempts === 4
      && moment() <= moment(attempt.lock_time)) {
      return res.status(200).json('Bloqueado');
    }
    if (attempt.attempts > 4 && moment() < moment(attempt.lock_time)) {
      const body = {
        lock_time: moment(attempt.lock_time).add(5, 'minutes'),
      };
      await AttemptsModel.updateAttempt(body, email);
      return res.status(200).json('Bloqueado');
    }
    if (attempt.attempts >= 3 && moment() >= moment(attempt.lock_time)) {
      const body = {
        lock_time: moment().add(5, 'minutes'),
        attempts: 1,
      };
      await AttemptsModel.updateAttempt(body, email);
    }
    try {
      firebase_id = await FirebaseModel.login(email, password);
      console.log("🚀 ~ file: SessionController.js ~ line 78 ~ signIn ~ firebase_id", firebase_id)
      const user = await UserModel.getUserById(firebase_id);
      console.log("🚀 ~ file: SessionController.js ~ line 80 ~ signIn ~ user", user)
      let accessToken;
      if (user) {
        accessToken = jwt.sign(
          { user },
          process.env.NEXT_PUBLIC_JWT_SECRET,
        );

        req.session.set('user', {
          user,
          accessToken,
        });
        await req.session.save();

        const body = {
          attempts: 0,
        };

        await AttemptsModel.updateAttempt(body, email);

        return res.status(200).json({ accessToken, user });
      }
      const body = {
        attempts: 0,
      };
      await AttemptsModel.updateAttempt(body, email);
      await req.session.save();

      return res.status(200).json({ accessToken });
    } catch (error) {
      if (attempt.attempts === 3 && moment() < moment(attempt.lock_time)) {
        const body = {
          lock_time: moment().add(5, 'minutes'),
        };
        await AttemptsModel.updateAttempt(body, email);
      }
      console.error(error); //eslint-disable-line
      return res.status(400).json({ message: 'Email ou senha incorreto' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function validateSession(req, res) {
  try {
    const session = await req.session.get('user');
    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function logout(req, res) {
  try {
    req.session.destroy();
    return res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    console.error(error); //eslint-disable-line
    return res.status(500).json({ message: 'Could not log out' });
  }
}

export async function forgottenPassword(request, response) {
  try {
    const { email } = request.body;
    const res = await FirebaseModel.firebaseChangeUserPassword(email);
    return response.status(200).json({ res });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return response.status(500).json({
      notification: 'Error while trying to send reset password email',
    });
  }
}
