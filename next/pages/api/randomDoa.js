// pages/api/randomSupplication.js
import fs from 'fs';
import path from 'path';
import { cors, runMiddleware } from '../../lib/cors';

// Helper function to get a random supplication
function getRandomSupplication(supplications) {
  const randomIndex = Math.floor(Math.random() * supplications.length);
  return supplications[randomIndex];
}

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  // Read the JSON file
  const filePath = path.resolve(process.cwd(), 'doa.json');
  console.log(filePath);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const supplications = JSON.parse(fileContent);

  // Pick a random supplication
  const randomSupplication = getRandomSupplication(supplications);

  // Send the response
  res.status(200).json(randomSupplication);
}
