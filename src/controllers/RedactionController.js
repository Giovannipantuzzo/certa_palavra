/* eslint-disable max-len */
import moment from 'moment';
import RedactionModel from '../models/RedactionModel';
import CorrectedRedactionModel from '../models/CorrectedRedactionModel';
import FirebaseModel from '../models/FirebaseModel';

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
    const {
      status, firebase_id, firstDate, secondDate,
    } = request.query;
    let redactions;
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
  const firebase_id = await FirebaseModel.getSession();
  info.redaction_id = uuidv4();
  info.firebase_id = firebase_id;
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
  const { id } = request.query;
  const firebase_id = await FirebaseModel.getSession();
  const correctedRedaction = {
    firebase_id,
    redaction_id: id,
    created_at: moment(),
  };
  try {
    const corrected = redaction.corrected_at ? await CorrectedRedactionModel.updateCorrection(correctedRedaction) : await CorrectedRedactionModel.createNewCorrectedRedaction(correctedRedaction);
    redaction.corrected_at = moment();
    await RedactionModel.updateRedaction(redaction, id);
  } catch (error) {
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
  return response.status(200).json({ notification: 'Redaction updated' });
}
