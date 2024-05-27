import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByCity = async (req, res) => {
  try {
    const filePath = path.join(__dirname,'..',"..","..", 'data', 'organisations.tsv');
    const organizations = await readTSV(filePath);

    const cityCount = organizations.reduce((acc, org) => {
      let city = org.city || 'Unknown City';
      if (city === 'N/A' || city === 'NA') {
        city = 'Unknown City';
      }
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    res.json(cityCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
