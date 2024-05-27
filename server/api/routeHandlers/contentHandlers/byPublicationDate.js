import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByPublicationDate = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..',"..", "..", 'data', 'content.tsv');
    const content = await readTSV(filePath);

    const publicationDateCount = content.reduce((acc, item) => {
      const date = item.publication_date || 'Unknown Date';
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    res.json(publicationDateCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
