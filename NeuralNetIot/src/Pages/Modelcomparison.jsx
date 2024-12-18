import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelCard from '@/Component/Modelcard';

const traditionalModels = [
  {
    name: 'XGBoost',
    description: 'An optimized gradient boosting library.',
    pros: ['High performance', 'Handles missing data', 'Regularization to prevent overfitting'],
    cons: ['Can be computationally expensive', 'Less interpretable than simpler models', 'Requires careful tuning']
  },
  {
    name: 'Stochastic Gradient Descent',
    description: 'An iterative method for optimizing an objective function.',
    pros: ['Efficient for large-scale learning', 'Works well with sparse data', 'Online learning capability'],
    cons: ['Sensitive to feature scaling', 'Requires tuning of learning rate', 'May converge to local minima']
  },
  {
    name: 'Decision Tree',
    description: 'A tree-like model of decisions and their consequences.',
    pros: ['Easy to understand and interpret', 'Requires little data preparation', 'Can handle both numerical and categorical data'],
    cons: ['Can create overly complex trees', 'Biased with imbalanced datasets', 'Unstable (small changes can lead to a different tree)']
  },
  {
    name: 'Random Forest',
    description: 'An ensemble of decision trees.',
    pros: ['Reduces overfitting', 'Handles large datasets with higher dimensionality', 'Provides feature importance'],
    cons: ['Less interpretable than a single decision tree', 'Computationally expensive', 'Biased in favor of attributes with more levels']
  },
  {
    name: 'K-Nearest Neighbors (KNN)',
    description: 'A non-parametric method used for classification and regression.',
    pros: ['Simple to understand and implement', 'No assumptions about data distribution', 'Works well with multi-class problems'],
    cons: ['Computationally expensive for large datasets', 'Sensitive to irrelevant features', 'Requires feature scaling']
  },
  {
    name: 'Support Vector Machine (SVM)',
    description: 'A supervised learning model for classification and regression.',
    pros: ['Effective in high dimensional spaces', 'Memory efficient', 'Versatile through different kernel functions'],
    cons: ['Not suitable for large datasets', 'Sensitive to choice of kernel', 'Difficult to interpret']
  }
];

const sequenceModels = [
  {
    name: 'RNN',
    description: 'Recurrent Neural Network for processing sequential data.',
    pros: ['Can process sequences of variable length', 'Shares parameters across time steps', 'Suitable for time series data'],
    cons: ['Suffers from vanishing/exploding gradients', 'Limited long-term memory', 'Slow to train on long sequences']
  },
  {
    name: 'LSTM',
    description: 'Long Short-Term Memory, a type of RNN.',
    pros: ['Solves vanishing gradient problem', 'Can capture long-term dependencies', 'Effective for various sequence tasks'],
    cons: ['More complex than simple RNNs', 'Computationally expensive', 'May overfit on small datasets']
  },
  {
    name: 'GRU',
    description: 'Gated Recurrent Unit, a simpler variant of LSTM.',
    pros: ['Simpler architecture than LSTM', 'Faster training and execution', 'Good performance on various tasks'],
    cons: ['May not capture long-term dependencies as well as LSTM', 'Less flexible than LSTM', 'Newer and less widely adopted']
  },
  {
    name: 'Attention RNN',
    description: 'RNN with an attention mechanism.',
    pros: ['Can focus on relevant parts of input', 'Improves performance on long sequences', 'Provides interpretability'],
    cons: ['Increases computational complexity', 'May not always improve performance', 'Can be difficult to implement correctly']
  },
  {
    name: 'Attention GRU',
    description: 'GRU with an attention mechanism.',
    pros: ['Combines benefits of GRU and attention', 'Effective for sequence-to-sequence tasks', 'Can handle variable-length inputs/outputs'],
    cons: ['More complex than standard GRU', 'May require more data to train effectively', 'Computationally intensive']
  },
  {
    name: 'Attention LSTM',
    description: 'LSTM with an attention mechanism.',
    pros: ['Powerful for sequence modeling', 'Can capture both long-term dependencies and focus on relevant information', 'State-of-the-art performance on many tasks'],
    cons: ['Most complex of the sequence models', 'Requires careful tuning', 'Computationally expensive to train and run']
  }
];

function MLModelComparison() {
  return (
      <div className="container mx-auto p-4 m-20">
          <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">Machine Learning Models Comparison</h1>
        <Tabs defaultValue="traditional" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="traditional">Traditional ML Models</TabsTrigger>
            <TabsTrigger value="sequence">Sequence Models</TabsTrigger>
          </TabsList>
          <TabsContent value="traditional" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {traditionalModels.map((model) => (
                <ModelCard key={model.name} model={model} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sequence" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sequenceModels.map((model) => (
                <ModelCard key={model.name} model={model} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
}

export default MLModelComparison;
