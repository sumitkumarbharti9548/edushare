const fs = require('fs').promises;
const path = require('path');

// File paths
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const MATERIALS_FILE = path.join(__dirname, 'data', 'materials.json');

// Ensure data directory exists
async function initDataFiles() {
  try {
    await fs.mkdir(path.join(__dirname, 'data'));
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, '[]');
  }

  try {
    await fs.access(MATERIALS_FILE);
  } catch {
    await fs.writeFile(MATERIALS_FILE, '[]');
  }
}

// Example user route
app.post('/api/signup', async (req, res) => {
  const users = JSON.parse(await fs.readFile(USERS_FILE));
  // ... rest of your signup logic
  await fs.writeFile(USERS_FILE, JSON.stringify(users));
});