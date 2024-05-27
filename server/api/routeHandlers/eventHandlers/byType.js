import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByType = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', '..', '..', 'data', 'events.tsv');
    const content = await readTSV(filePath);

    const typeCount = content.reduce((acc, item) => {
      const type = item.event_type || 'Unknown Type';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    res.json(typeCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
