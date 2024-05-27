import express from 'express';
import organizationRoutes from './api/routes/organizationRoutes.js';
import contentRoutes from './api/routes/contentRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:3000', 'https://analytics-engine-project.vercel.app']; // Add your frontend URL here

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin - like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));

app.use('/organizations', organizationRoutes);
app.use('/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
