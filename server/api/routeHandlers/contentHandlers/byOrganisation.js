import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByOrganisation = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..',"..", "..", 'data', 'content.tsv');
    const content = await readTSV(filePath);

    const organisationCount = content.reduce((acc, item) => {
      const organisation = item.organisation_id || 'Unknown Organisation';
      acc[organisation] = (acc[organisation] || 0) + 1;
      return acc;
    }, {});

    res.json(organisationCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
