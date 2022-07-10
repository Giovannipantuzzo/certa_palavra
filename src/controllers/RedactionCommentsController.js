import RedactionCommentsModel from '../models/RedactionCommentsModel';
const { v4: uuidv4 } = require('uuid');

export async function getAllComments(request, response) {
  const { firebase_id, redaction_id } = request.body;

  try {
    const comments = await RedactionCommentsModel.getAllComments(
      firebase_id, redaction_id,
    );
    return response.status(200).json(comments);
  } catch (error) {
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function createComment(request, response) {
  const info = request.body;
  info.comment_id = uuidv4();

  try {
    const newComment = await RedactionCommentsModel.createComment(info);
    return response.status(200).json(newComment);
  } catch (error) {
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function deleteComment(request, response) {
  try {
    const { id } = request.query;

    await RedactionCommentsModel.deleteComment(id);

    return response.status(200).json({ message: 'Sucesso!' });
  } catch (error) {
    console.error(error); //eslint-disable-line
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}
