// handlers/getByType.js
import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const validContentTypes = ['article', 'report', 'blog', 'video']; // Add other valid content types if needed

export const getByType = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', '..', '..', 'data', 'content.tsv');
    const content = await readTSV(filePath);

    const typeCount = content.reduce((acc, item) => {
      const type = item.content_type || 'Unknown Type';
      if (validContentTypes.includes(type)) {
        acc[type] = (acc[type] || 0) + 1;
      } else {
        acc['Unknown Type'] = (acc['Unknown Type'] || 0) + 1;
      }
      return acc;
    }, {});

    res.json(typeCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
