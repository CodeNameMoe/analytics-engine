import path from 'path';
import { fileURLToPath } from 'url';
import { readTSV } from '../../helpers/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getByIndustryLocation = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..','..', '..','data', 'organisations.tsv');
    const organizations = await readTSV(filePath);

    const industryLocationCount = organizations.reduce((acc, org) => {
      const industry = org.industry || 'Unknown Industry';
      const location = `${org.country}, ${org.state || 'Unknown State'}`;
      if (!acc[industry]) acc[industry] = {};
      acc[industry][location] = (acc[industry][location] || 0) + 1;
      return acc;
    }, {});

    res.json(industryLocationCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
