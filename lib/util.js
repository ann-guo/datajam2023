const fs = require('fs');
const path = require('path');

module.exports = {
  getJsonFiles() {
    const dir = './public/dota-Copy/International';
    const files = fs.readdirSync(dir).filter(file => path.extname(file) === '.json');
    
    const jsonContents = files.map(file => {
      const filePath = path.join(dir, file);
      return this.readJsonFileSync(filePath); // Use `this.readJsonFileSync`
    });
    
    return jsonContents;
  },
  getJsonFilesArlington() {
    const dir = './public/dota/PGL-Arlington-Major-2022';
    const files = fs.readdirSync(dir).filter(file => path.extname(file) === '.json');
    
    const jsonContents = files.map(file => {
      const filePath = path.join(dir, file);
      return this.readJsonFileSync(filePath); // Use `this.readJsonFileSync`
    });
    
    return jsonContents;
  },

  readJsonFileSync(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading JSON file ${filePath}:`, error);
      return null;
    }
  },
  getGames(jsonFile) {
    if (jsonFile) {
      return jsonFile.games;
    } else {
      console.error('Invalid JSON format: Missing or invalid "games" property.');
      return [];
    }
  },
  

  

  
 
};