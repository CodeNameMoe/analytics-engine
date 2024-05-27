import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByCreator = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..',"..", "..", 'data', 'content.tsv');
    const content = await readTSV(filePath);

    const creatorCount = content.reduce((acc, item) => {
      const creator = item.creator_id || 'Unknown Creator';
      acc[creator] = (acc[creator] || 0) + 1;
      return acc;
    }, {});

    res.json(creatorCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
