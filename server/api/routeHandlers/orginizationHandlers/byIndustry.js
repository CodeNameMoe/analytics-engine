// byIndustry.js
import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByIndustry = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..','..', '..', 'data', 'organisations.tsv');
    const organizations = await readTSV(filePath);

    const industryCount = organizations.reduce((acc, org) => {
      const industry = org.industry || 'Unknown';
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {});

    res.json(industryCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
