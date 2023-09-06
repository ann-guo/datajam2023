//pages/api/files.js
const util = require('../../lib/util');

export default async function handler(req, res) {
  try {
    const jsonFiles = util.getJsonFiles();
    res.status(200).json({ files: jsonFiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}