# NeuralNetIoT

NeuralNetIoT is a comprehensive platform designed to streamline the process of working with machine learning (ML) and deep learning (DL) models. The project provides tools for model extraction, visualization, selection, and inference, making it easier for users to harness the power of ML and DL technologies.

## Features

- **Extracting PCPAS Metrics:**
  NeuralNetIoT enables users to extract key metrics like Performance, Cost, Power, Area, and Security (PCPAS) for ML and DL models.

- **Visualizing Models:**
  Users can visualize the architecture and performance of their models to gain deeper insights.

- **Model Selection Guidance:**
  The platform helps users decide on the most appropriate model for their specific use case, factoring in accuracy, latency, and resource requirements.

- **Inference Support:**
  Supports inference for multiple ML and DL models, including:
  - Recurrent Neural Networks (RNNs)
  - Long Short-Term Memory (LSTMs)
  - Gated Recurrent Units (GRUs)
  - Attention-based variants

## File Structure

The project is organized as follows:

```plaintext
NeuralNetIoT/
├── .gitattributes
├── .gitignore
├── LICENSE
├── README.md
├── NeuralNetIoT/
    ├── public/
    │   ├── components.json
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── jsconfig.json
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   └── tailwind.config.js
    ├── server/
    │   ├── index.js
    │   ├── models/
    │   │   ├── index.js
    │   │   └── pcaptocsv.py
    │   └── predict_ml.py
    └── src/
        ├── components/
        │   ├── index.html
        │   └── vite.config.js
        └── views/
            ├── eslint.config.js
            ├── index.html
            └── package.json
```

### Key Directories and Files

- **`.gitattributes` and `.gitignore`:**
  Git configuration and ignore files to manage the repository.

- **`LICENSE`:**
  Contains the licensing details for the project.

- **`README.md`:**
  This file, providing an overview and instructions for the project.

- **`NeuralNetIoT/public/`:**
  Houses public assets, configurations, and entry points for the web-based user interface.

- **`NeuralNetIoT/server/`:**
  Contains server-side components, including scripts for ML model operations such as extraction and inference.

- **`NeuralNetIoT/src/`:**
  Holds the client-side source code, including UI components and views.

## Getting Started

Follow these steps to set up and use NeuralNetIoT:

### Prerequisites

- Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- Install Python (recommended version: 3.8 or above).
- Clone the repository:
  ```bash
  git clone https://github.com/YourUsername/NeuralNetIoT.git
  ```

### Installation

1. Navigate to the project directory:
   ```bash
   cd NeuralNetIoT
   ```

2. Install client-side dependencies:
   ```bash
   cd public
   npm install
   ```

3. Install server-side dependencies:
   ```bash
   cd ../server
   npm install
   ```

 

### Running the Project

1. Start the server:
   ```bash
   cd server
   node index.js
   ```

2. Start the client:
   ```bash
   cd ../public
   npm run dev
   ```

3. Access the application in your browser at `http://localhost:3000` (default port).

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file.

## Acknowledgments

- Inspired by advancements in ML and DL technologies.
- Built using modern web development tools like Node.js and Tailwind CSS.


Enjoy using NeuralNetIoT!
