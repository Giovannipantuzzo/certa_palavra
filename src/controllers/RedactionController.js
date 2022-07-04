import RedactionModel from '../models/RedactionModel';

const { v4: uuidv4 } = require('uuid');

export async function getOne(request, response) {
  const { id } = request.query;

  try {
    const redaction = await RedactionModel.getRedactionsById(id);
    return response.status(200).json(redaction);
  } catch (error) {
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function getAll(request, response) {
  try {
    const { status, firebase_id, firstDate, secondDate } = request.query;
    let redactions;
    console.log("🚀 ~ file: RedactionController.js ~ line 24 ~ getAll ~ firebase_id", firebase_id)
    if (firebase_id) {
      redactions = await RedactionModel.getAllRedactions(
        status,
        firebase_id,
      );
    } else if (firstDate && secondDate) {
      redactions = await RedactionModel.getAllRedactionsFiltered(
        status,
        firstDate,
        secondDate,
      );
    } else {
      redactions = await RedactionModel.getAllRedactions(status);
    }
    return response.status(200).json(redactions);
  } catch (error) {
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function create(request, response) {
  const info = request.body;
  info.redaction_id = uuidv4();
  try {
    const newRedaction = await RedactionModel.createNewRedaction(info);
    return response.status(200).json(newRedaction);
  } catch (error) {
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function deleteRedact(request, response) {
  try {
    const { id } = request.query;

    await RedactionModel.deleteRedaction(id);

    return response.status(200).json({ message: 'Sucesso!' });
  } catch (error) {
    console.error(error); //eslint-disable-line
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function update(request, response) {
  const redaction = request.body;

  try {
    await RedactionModel.updateRedaction(redaction);
  } catch (error) {
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
  return response.status(200).json({ notification: 'Redaction updated' });
}
