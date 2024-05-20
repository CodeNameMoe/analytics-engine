import express from 'express';
import cors from 'cors';
import organizationRoutes from './api/routes/organizationRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/organizations', organizationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
