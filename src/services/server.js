// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Path to your learners JSON file
const learnersFilePath = path.join(__dirname, 'data', 'learners.json');

// Read learners from the JSON file
const readLearners = () => {
    return JSON.parse(fs.readFileSync(learnersFilePath, 'utf8'));
};

// Write learners to the JSON file
const writeLearners = (data) => {
    fs.writeFileSync(learnersFilePath, JSON.stringify(data, null, 2));
};

// POST: Add a new learner or assignment
app.post('/api/learners/:id', (req, res) => {
    const learnerId = req.params.id;
    const newMarks = req.body.learners;

    // Read existing learners
    const learners = readLearners();

    // Find the learner and update their marks
    const updatedLearners = learners.map(learner => {
        if (learner.id === learnerId) {
            return { ...learner, marks: newMarks.marks }; // Replace with new marks
        }
        return learner;
    });

    // Write the updated learners back to the JSON file
    writeLearners(updatedLearners);

    res.status(201).json({ message: 'Learner data added/updated successfully!' });
});

// PUT: Update an existing learner or assignment
app.put('/api/learners/:id', (req, res) => {
    const learnerId = req.params.id;
    const updatedData = req.body.learners;

    // Read existing learners
    const learners = readLearners();

    // Update the learner's marks
    const updatedLearners = learners.map(learner => {
        if (learner.id === learnerId) {
            return { ...learner, marks: updatedData.marks }; // Update marks
        }
        return learner;
    });

    // Write the updated learners back to the JSON file
    writeLearners(updatedLearners);

    res.status(200).json({ message: 'Learner data updated successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
