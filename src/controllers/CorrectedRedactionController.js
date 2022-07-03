import CorrectedRedactionModel from '../models/CorrectedRedactionModel';

export async function getOne(request, response) {
  const { id } = request.query;

  try {
    const redaction = await CorrectedRedactionModel.getRedactionsById(id);
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
    const redactions = await CorrectedRedactionModel.getAllCorrectedRedactions();
    return response.status(200).json(redactions);
  } catch (error) {
    if (err?.message) {
      return response.status(400).json({ notification: err.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function create(request, response) {
  const info = request.body;
  try {
    const newRedaction = await CorrectedRedactionModel.createNewCorrectedRedaction(info);
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

    await CorrectedRedactionModel.deleteRedaction(id);

    return response.status(200).json({ message: 'Sucesso!' });
  } catch (error) {
    console.error(error); //eslint-disable-line
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
}

export async function update(request, response) {
  const redaction = request.body;

  try {
    await CorrectedRedactionModel.updateRedaction(redaction);
  } catch (error) {
    if (error.message) {
      return response.status(400).json({ notification: error.message });
    }
    return response.status(500).json({ notification: 'Internal Server Error' });
  }
  return response.status(200).json({ notification: 'Redaction updated' });
}
