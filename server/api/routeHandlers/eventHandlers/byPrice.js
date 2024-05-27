import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByPrice = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', '..', '..', 'data', 'events.tsv');
    const content = await readTSV(filePath);

    const priceCount = content.reduce((acc, item) => {
      const price = item.price ? item.price.trim().toLowerCase() : '';
      if (price.includes('free')) {
        acc['Free'] = (acc['Free'] || 0) + 1;
      } else if (price.startsWith('from $')) {
        acc['Paid'] = (acc['Paid'] || 0) + 1;
      }
      return acc;
    }, {});

    res.json(priceCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
