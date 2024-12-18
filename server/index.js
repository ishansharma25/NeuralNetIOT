require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { exec } = require('child_process');
const app = express();
app.use(express.json()); // Important for parsing JSON bodies
const upload = multer({ dest: 'uploads/' }); 

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/************************************************************************************************************* */
// Prediction route
/*
app.post('/api/predict', (req, res) => {
  try {
    const { model, inputValues } = req.body;
    console.log(req.body)
    console.log(model)
    console.log(inputValues)
    // Validate input
    if (!model || !inputValues || !Array.isArray(inputValues)) {
      console.log(d)
      return res.status(400).json({ 
        error: 'Invalid input', 
        message: 'Model and input values are required' 
      });
    }

    // Construct full path to the model
    const modelPath = path.join(__dirname, 'models', model);
    console.log(model)
    // Prepare arguments for Python script
    const args = [
      path.join(__dirname, 'predict.py'),  // Python script path
      modelPath,                           // Model path
      ...inputValues.map(String)           // Input values
    ];

    // Spawn Python process
    const pythonProcess = spawn('python', args);

    // Collect output
    let outputData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });

    // Handle process close
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        // Process failed
        console.error('Prediction failed with error:', errorData);
        return res.status(500).json({
          error: 'Prediction failed',
          details: errorData
        });
      }

      try {
        // Parse the output
        const result = JSON.parse(outputData.trim());
        
        // Check if there's an error in the result
        if (result.error) {
          console.error('Prediction error:', result.error, 'Details:', result.details);
          return res.status(500).json(result);
        }

        // Send successful prediction
        res.json(result);
      } catch (parseError) {
        console.error('Failed to parse prediction result:', outputData);
        res.status(500).json({
          error: 'Failed to parse prediction result',
          details: outputData
        });
      }
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});*/

app.post('/api/predict', (req, res) => {
  console.log('Received prediction request');
  
  try {
    const { model, inputValues } = req.body;
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Validate request
    if (!model || !inputValues) {
      console.error('Missing required fields');
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Model and input values are required'
      });
    }

    // Check if model file exists
    const modelPath = path.join(__dirname, 'models', model);
    if (!fs.existsSync(modelPath)) {
      console.error('Model not found:', modelPath);
      return res.status(404).json({
        error: 'Model not found',
        message: `Model ${model} does not exist at ${modelPath}`
      });
    }

    // Validate required fields
    const requiredFields = [
      'appName', 'totalSourceBytes', 'totalDestinationBytes',
      'sourceip', 'destinationip', 'protocolName'
    ];
    
    const missingFields = requiredFields.filter(field => !inputValues[field]);
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return res.status(400).json({
        error: 'Missing required fields',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const jsonString = JSON.stringify(inputValues);
    console.log('Sending to Python:', jsonString);

    const pythonProcess = spawn('python', [
      path.join(__dirname, 'predict.py'),
      modelPath,
      jsonString
    ]);

    let outputData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      console.log('Python stdout:', data.toString());
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python stderr:', data.toString());
      errorData += data.toString();
    });

    pythonProcess.on('close', (code) => {
      console.log('Python process exited with code:', code);
      console.log('Full output:', outputData);
      console.log('Full errors:', errorData);

      if (code !== 0) {
        return res.status(500).json({
          error: 'Python process failed',
          message: errorData || 'Unknown error occurred',
          code
        });
      }

      try {
        // Try to find valid JSON in the output
        const jsonStart = outputData.lastIndexOf('{');
        const jsonEnd = outputData.lastIndexOf('}');
        
        if (jsonStart === -1 || jsonEnd === -1) {
          throw new Error('No valid JSON found in Python output');
        }

        const jsonStr = outputData.slice(jsonStart, jsonEnd + 1);
        const result = JSON.parse(jsonStr);

        if (result.error) {
          return res.status(500).json({
            error: result.error,
            message: result.message || result.details || 'Prediction failed'
          });
        }

        res.json(result);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        res.status(500).json({
          error: 'Failed to parse prediction result',
          message: `Parse error: ${parseError.message}`,
          rawOutput: outputData
        });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});
/****************************************************** ml-------------------------*/

app.post('/api/predict_ml', (req, res) => {
  console.log('Received prediction request');
  
  try {
    const { model, inputValues } = req.body;
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Validate request
    if (!model || !inputValues) {
      console.error('Missing required fields');
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Model and input values are required'
      });
    }

    // Check if model file exists
    const modelPath = path.join(__dirname, 'models', model);
    if (!fs.existsSync(modelPath)) {
      console.error('Model not found:', modelPath);
      return res.status(404).json({
        error: 'Model not found',
        message: `Model ${model} does not exist at ${modelPath}`
      });
    }

    // Validate required fields
    const requiredFields = [
      'appName', 'totalSourceBytes', 'totalDestinationBytes',
      'sourceip', 'destinationip', 'protocolName'
    ];
    
    const missingFields = requiredFields.filter(field => !inputValues[field]);
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return res.status(400).json({
        error: 'Missing required fields',
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const jsonString = JSON.stringify(inputValues);
    console.log('Sending to Python:', jsonString);

    const pythonProcess = spawn('python', [
      path.join(__dirname, 'predict_ml.py'),
      modelPath,
      jsonString
    ]);

    let outputData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      console.log('Python stdout:', data.toString());
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python stderr:', data.toString());
      errorData += data.toString();
    });

    pythonProcess.on('close', (code) => {
      console.log('Python process exited with code:', code);
      console.log('Full output:', outputData);
      console.log('Full errors:', errorData);

      if (code !== 0) {
        return res.status(500).json({
          error: 'Python process failed',
          message: errorData || 'Unknown error occurred',
          code
        });
      }

      try {
        // Try to find valid JSON in the output
        const jsonStart = outputData.lastIndexOf('{');
        const jsonEnd = outputData.lastIndexOf('}');
        
        if (jsonStart === -1 || jsonEnd === -1) {
          throw new Error('No valid JSON found in Python output');
        }

        const jsonStr = outputData.slice(jsonStart, jsonEnd + 1);
        const result = JSON.parse(jsonStr);

        if (result.error) {
          return res.status(500).json({
            error: result.error,
            message: result.message || result.details || 'Prediction failed'
          });
        }

        res.json(result);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        res.status(500).json({
          error: 'Failed to parse prediction result',
          message: `Parse error: ${parseError.message}`,
          rawOutput: outputData
        });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/******************************************************************************************** */
// Handle file upload and processing
app.post('/api/upload', upload.single('pcapFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const pcapngFilePath = path.join(__dirname, req.file.path);
  const csvFileName = `${req.file.filename}.csv`;
  const csvFilePath = path.join(__dirname, 'downloads', csvFileName);

  // Ensure downloads directory exists
  const downloadsDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // Run the Python script with error handling
  exec(`python pcaptocsv.py "${pcapngFilePath}" "${csvFilePath}"`, (err, stdout, stderr) => {
    // Clean up uploaded file after processing
    fs.unlink(pcapngFilePath, (unlinkErr) => {
      if (unlinkErr) console.error('Error removing uploaded file:', unlinkErr);
    });

    if (err) {
      console.error('Error running Python script:', stderr);
      return res.status(500).send('Error processing the PCAPNG file');
    }

    console.log('Python script output:', stdout);
    res.json({ csvFile: csvFileName });
  });
});

// Serve the generated CSV file for download
app.get('/downloads/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'downloads', req.params.fileName);
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});