const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());
// Public folder aacible for web browser 
app.use(express.static("public"))

// Sample data
const teamMembers = [
    { name: 'Sonali', role: 'Developer', bio: 'Experienced in HTML,css and JavaScript.' },
    { name: 'Rohan', role: 'Designer', bio: 'Specializes in UI/UX design.' },
    { name: 'Sonam', role: 'Project Manager', bio: 'Expert in Agile methodologies.' },
    { name: 'Sonu', role: 'QA Engineer', bio: 'Skilled in automated testing.' }
];

// API endpoint to fetch team members
app.get('/api/team-members', (req, res) => {
    res.json(teamMembers);
});

// Enable CORS for the specific origin
app.use(cors({ origin: 'https://team-dashboard-azure.vercel.app' }));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});