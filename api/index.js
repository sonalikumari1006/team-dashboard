 const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// Enable CORS
// app.use(cors());
// Public folder aacible for web browser 
// app.use(express.static("public"))

// Sample data
// const teamMembers = [
//     { name: 'Sonali', role: 'Developer', bio: 'Experienced in HTML,css and JavaScript.' },
//     { name: 'Rohan', role: 'Designer', bio: 'Specializes in UI/UX design.' },
//     { name: 'Sonam', role: 'Project Manager', bio: 'Expert in Agile methodologies.' },
//     { name: 'Sonu', role: 'QA Engineer', bio: 'Skilled in automated testing.' }
// ];

// API endpoint to fetch team members
// app.get('/api/team-members', (req, res) => {
//     res.json(teamMembers);
// });



// Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


// Importing CORS and Express is unnecessary on Vercel for API routes
// You can handle CORS using a middleware if necessary, but Vercel handles it automatically

// api/team-members.js
// const cors = require('cors');

// const teamMembers = [
//     { name: 'Sonali', role: 'Developer', bio: 'Experienced in HTML, CSS, and JavaScript.' },
//     { name: 'Rohan', role: 'Designer', bio: 'Specializes in UI/UX design.' },
//     { name: 'Sonam', role: 'Project Manager', bio: 'Expert in Agile methodologies.' },
//     { name: 'Sonu', role: 'QA Engineer', bio: 'Skilled in automated testing.' }
// ];

// // API endpoint to fetch team members
// module.exports = (req, res) => {
//     // Enable CORS for the specific origin
//     cors({ origin: 'https://team-dashboard-azure.vercel.app/api/index' })(req, res, () => {
//         res.status(200).json(teamMembers);
//     });
// };


const cors = require('cors');

const teamMembers = [
    { name: 'Sonali', role: 'Developer', bio: 'Experienced in HTML, CSS, and JavaScript.' },
    { name: 'Rohan', role: 'Designer', bio: 'Specializes in UI/UX design.' },
    { name: 'Sonam', role: 'Project Manager', bio: 'Expert in Agile methodologies.' },
    { name: 'Sonu', role: 'QA Engineer', bio: 'Skilled in automated testing.' }
];

// API endpoint to fetch team members
module.exports = (req, res) => {
    // Allow CORS for your frontend origin
    res.setHeader('Access-Control-Allow-Origin', 'https://team-dashboard-git-main-sonali-kumari-s-projects.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // Respond with the team member data
    res.status(200).json(teamMembers);
};
