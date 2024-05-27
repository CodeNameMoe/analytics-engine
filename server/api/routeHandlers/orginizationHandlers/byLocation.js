// byIndustry.js
import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByLocation = async (req, res) => {
  try {
    const filePath = path.join(__dirname,'..', "..", "..", 'data', 'organisations.tsv');
    const organizations = await readTSV(filePath);

    const locationCount = organizations.reduce((acc, org) => {
      let city = org.city || 'Unknown City';
      let state = org.state || 'Unknown State';

      // Normalize NA and N/A to Unknown
      if (city === 'N/A' || city === 'NA') {
        city = 'Unknown City';
      }
      if (state === 'N/A' || state === 'NA') {
        state = 'Unknown State';
      }

      const location = `${city}, ${state}`;
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {});

    res.json(locationCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
