import FirebaseModel from '../models/FirebaseModel';
import UserModel from '../models/UserModel';
import AttemptsModel from '../models/AttemptsModel';

export async function getOne(request, response) {
  const { id } = request.query;

  try {
    const users = await UserModel.getUserById(id);
    return response.status(200).json(users);
  } catch (error) {
    if (err.message) {
      return response.status(400).json({ notification: err.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function getAll(request, response) {
  try {
    const users = await UserModel.getAllUsers();
    return response.status(200).json(users);
  } catch (error) {
    if (err.message) {
      return response.status(400).json({ notification: err.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function create(request, response) {
  const user = request.body;
  let firebase_id;

  try {
    const regex = new RegExp('.+@.+\..+');
    if (!regex.test(request.body.email)) {
      throw new Error('Formato de email inválido');
    }
    firebase_id = await FirebaseModel
      .createNewUser(user.email, user.password);

    user.firebase_id = firebase_id;
    delete user.password;
    await UserModel.createNewUser(user);
    await AttemptsModel.createAttempt();
  } catch (error) {
    if (firebase_id) {
      await FirebaseModel.deleteUser(firebase_id);
    }
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
  return response.status(200).json({ notification: 'Usuario criado!' });
}

export async function deleteBoth(request, response) {
  try {
    const { id } = request.query;

    await FirebaseModel.deleteUser(id);
    await UserModel.deleteUser(id);

    return response.status(200).json({ message: 'Sucesso!' });
  } catch (error) {
    console.error(error); //eslint-disable-line
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function update(request, response) {
  try {
    const { id } = request.query;
    const newUser = request.body;
    const { password, email } = request.body;

    if (password) {
      const user = await UserModel.getUserById(id);
      const firebaseId = user.firebase_id;
      await FirebaseModel.changeUserPassword(firebaseId, password);
      delete newUser.password;
      return response.status(200).json({ message: 'Sucesso!' });
    }

    if (email) {
      const user = await UserModel.getUserById(id);
      const firebaseId = user.firebase;
      await FirebaseModel.changeUserEmail(firebaseId, email);
    }

    await UserModel.updateUser(newUser, id);

    const updatedUser = await UserModel.getUserById(id);
    return response.status(200).json(updatedUser, { message: 'Sucesso!' });
  } catch (error) {
    console.error(error); //eslint-disable-line
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function updatePassword(request, response) {
  const { firebase_id, password } = request.body;

  try {
    await FirebaseModel.changeUserPassword(firebase_id, password);
  } catch (err) {
    if (err.message) {
      return response.status(400).json({ notification: err.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
  return response.status(200).json({ notification: 'User password updated' });
}
