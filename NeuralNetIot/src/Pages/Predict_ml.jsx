import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, ShieldCheck, Waves } from 'lucide-react';

const Predict_ml = () => {
  // State to manage form inputs
  const [inputValues, setInputValues] = useState({
    appName: '',
    totalSourceBytes: '',
    totalDestinationBytes: '',
    totalDestinationPackets: '',
    totalSourcePackets: '',
    direction: '',
    sourceTCPFlagsDescription: '',
    destinationTCPFlagsDescription: '',
    sourceip: '',
    protocolName: '',
    sourcePort: '',
    destinationip: '',
    destinationPort: '',
    startDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
    stopDateTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
  });

  // State for model selection and prediction
  const [selectedModel, setSelectedModel] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle model selection
  const handleModelChange = (value) => {
    setSelectedModel(value);
  };

  // Reset form
  const resetForm = () => {
    setInputValues({
      appName: '',
      totalSourceBytes: '',
      totalDestinationBytes: '',
      totalDestinationPackets: '',
      totalSourcePackets: '',
      direction: '',
      sourceTCPFlagsDescription: '',
      destinationTCPFlagsDescription: '',
      sourceip: '',
      protocolName: '',
      sourcePort: '',
      destinationip: '',
      destinationPort: '',
      startDateTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      stopDateTime: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });
    setPredictionResult(null);
    setError(null);
  };

  const isValidIP = (ip) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;
    const parts = ip.split('.');
    return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPredictionResult(null);
    setIsLoading(true);
  
    if (!selectedModel) {
      setError('Please select a model');
      setIsLoading(false);
      return;
    }
  
    if (!isValidIP(inputValues.sourceip) || !isValidIP(inputValues.destinationip)) {
      setError('Please enter valid IP addresses');
      setIsLoading(false);
      return;
    }
  
    // Format dates to match Python's expected format
    const formatDateTime = (dateTimeStr) => {
      try {
        return new Date(dateTimeStr).toISOString()
          .slice(0, 19)
          .replace('T', ' ');
      } catch (err) {
        console.error('Date formatting error:', err);
        return dateTimeStr;
      }
    };
  
    const requestData = {
      model: selectedModel,
      inputValues: {
        appName: inputValues.appName,
        totalSourceBytes: parseInt(inputValues.totalSourceBytes) || 0,
        totalDestinationBytes: parseInt(inputValues.totalDestinationBytes) || 0,
        totalDestinationPackets: parseInt(inputValues.totalDestinationPackets) || 0,
        totalSourcePackets: parseInt(inputValues.totalSourcePackets) || 0,
        direction: inputValues.direction,
        sourceTCPFlagsDescription: inputValues.sourceTCPFlagsDescription || '',
        destinationTCPFlagsDescription: inputValues.destinationTCPFlagsDescription || '',
        sourceip: inputValues.sourceip,
        protocolName: inputValues.protocolName,
        sourcePort: parseInt(inputValues.sourcePort) || 0,
        destinationip: inputValues.destinationip,
        destinationPort: parseInt(inputValues.destinationPort) || 0,
        startDateTime: formatDateTime(inputValues.startDateTime),
        stopDateTime: formatDateTime(inputValues.stopDateTime)
      }
    };
  
    console.log('Sending request with data:', requestData);
  
    try {
      const response = await fetch('http://localhost:5000/api/predict_ml', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      const responseText = await response.text();
      console.log('Raw response:', responseText);
  
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (err) {
        console.error('Error parsing response:', err);
        throw new Error(`Failed to parse server response: ${responseText}`);
      }
  
      if (!response.ok) {
        throw new Error(result.message || result.error || 'Prediction failed');
      }
  
      setPredictionResult(result);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to get prediction. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-20 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-2 border-purple-200">
        <CardHeader className="bg-purple-600 text-white py-6">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Waves className="mr-3 h-8 w-8" />
            Inference ML Models
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white rounded-b-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Model Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-purple-800">Select Model</label>
              <Select onValueChange={handleModelChange} value={selectedModel}>
                <SelectTrigger className="border-purple-300 focus:border-purple-500">
                  <SelectValue placeholder="Choose a model" className="text-purple-700" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="stochastic.pkl" className="hover:bg-purple-100">Stochastic (stochastic.pkl)</SelectItem>
                  <SelectItem value="quadratic_model.pkl" className="hover:bg-purple-100">Quadratic_model (quadratic_model.pkl)</SelectItem>
                  <SelectItem value="Logistics_Reg.pkl" className="hover:bg-purple-100">Logistics_Reg (Logistics_Reg.pkl)</SelectItem>
                  <SelectItem value="knn_model.pkl" className="hover:bg-purple-100">KNN Model (knn_model.pkl)</SelectItem>
                  <SelectItem value="Naive_bayes.pkl" className="hover:bg-purple-100">Naive_Bayes (Naive_bayes.pkl)</SelectItem>
               
                </SelectContent>
              </Select>
            </div>

            {/* Network Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* App Name */}
              <div className="space-y-2">
                <label htmlFor="appName" className="block text-sm font-medium text-purple-800">
                  Application Name
                </label>
                <Input
                  type="text"
                  id="appName"
                  name="appName"
                  value={inputValues.appName}
                  onChange={handleInputChange}
                  placeholder="Enter application name"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                />
              </div>

              {/* Source and Destination Bytes */}
              <div className="space-y-2">
                <label htmlFor="totalSourceBytes" className="block text-sm font-medium text-purple-800">
                  Total Source Bytes
                </label>
                <Input
                  type="number"
                  id="totalSourceBytes"
                  name="totalSourceBytes"
                  value={inputValues.totalSourceBytes}
                  onChange={handleInputChange}
                  placeholder="Enter total source bytes"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="totalDestinationBytes" className="block text-sm font-medium text-purple-800">
                  Total Destination Bytes
                </label>
                <Input
                  type="number"
                  id="totalDestinationBytes"
                  name="totalDestinationBytes"
                  value={inputValues.totalDestinationBytes}
                  onChange={handleInputChange}
                  placeholder="Enter total destination bytes"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                />
              </div>

              {/* Source and Destination Packets */}
              <div className="space-y-2">
                <label htmlFor="totalSourcePackets" className="block text-sm font-medium text-purple-800">
                  Total Source Packets
                </label>
                <Input
                  type="number"
                  id="totalSourcePackets"
                  name="totalSourcePackets"
                  value={inputValues.totalSourcePackets}
                  onChange={handleInputChange}
                  placeholder="Enter total source packets"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="totalDestinationPackets" className="block text-sm font-medium text-purple-800">
                  Total Destination Packets
                </label>
                <Input
                  type="number"
                  id="totalDestinationPackets"
                  name="totalDestinationPackets"
                  value={inputValues.totalDestinationPackets}
                  onChange={handleInputChange}
                  placeholder="Enter total destination packets"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                />
              </div>

              {/* Direction */}
              <div className="space-y-2">
                <label htmlFor="direction" className="block text-sm font-medium text-purple-800">
                  Direction
                </label>
                <Select 
                  name="direction"
                  value={inputValues.direction}
                  onValueChange={(value) => setInputValues(prev => ({...prev, direction: value}))}
                >
                  <SelectTrigger className="border-purple-300 focus:border-purple-500 text-purple-800">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="inbound" className="hover:bg-purple-100">Inbound</SelectItem>
                    <SelectItem value="outbound" className="hover:bg-purple-100">Outbound</SelectItem>
                    <SelectItem value="internal" className="hover:bg-purple-100">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Protocol Name */}
              <div className="space-y-2">
                <label htmlFor="protocolName" className="block text-sm font-medium text-purple-800">
                  Protocol Name
                </label>
                <Select 
                  name="protocolName"
                  value={inputValues.protocolName}
                  onValueChange={(value) => setInputValues(prev => ({...prev, protocolName: value}))}
                >
                  <SelectTrigger className="border-purple-300 focus:border-purple-500 text-purple-800">
                    <SelectValue placeholder="Select protocol" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="TCP" className="hover:bg-purple-100">TCP</SelectItem>
                    <SelectItem value="UDP" className="hover:bg-purple-100">UDP</SelectItem>
                    <SelectItem value="ICMP" className="hover:bg-purple-100">ICMP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Source and Destination IPs */}
              <div className="space-y-2">
                <label htmlFor="sourceip" className="block text-sm font-medium text-purple-800">
                  Source IP
                </label>
                <Input
                  type="text"
                  id="sourceip"
                  name="sourceip"
                  value={inputValues.sourceip}
                  onChange={handleInputChange}
                  placeholder="Enter source IP (e.g., 192.168.1.1)"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
                
              </div>
              <div className="space-y-2">
                <label htmlFor="destinationip" className="block text-sm font-medium text-purple-800">
                  Destination IP
                </label>
                <Input
                  type="text"
                  id="destinationip"
                  name="destinationip"
                  value={inputValues.destinationip}
                  onChange={handleInputChange}
                  placeholder="Enter destination IP (e.g., 192.168.1.2)"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                  pattern="^(\d{1,3}\.){3}\d{1,3}$"
                />
              </div>

              {/* Source and Destination Ports */}
              <div className="space-y-2">
                <label htmlFor="sourcePort" className="block text-sm font-medium text-purple-800">
                  Source Port
                </label>
                <Input
                  type="number"
                  id="sourcePort"
                  name="sourcePort"
                  value={inputValues.sourcePort}
                  onChange={handleInputChange}
                  placeholder="Enter source port"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="destinationPort" className="block text-sm font-medium text-purple-800">
                  Destination Port
                </label>
                <Input
                  type="number"
                  id="destinationPort"
                  name="destinationPort"
                  value={inputValues.destinationPort}
                  onChange={handleInputChange}
                  placeholder="Enter destination port"
                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  required
                />
                {/* (Previous code remains the same) */}

              </div>

{/* TCP Flags Descriptions */}
<div className="space-y-2">
  <label htmlFor="sourceTCPFlagsDescription" className="block text-sm font-medium text-purple-800">
    Source TCP Flags
  </label>
  <Input
    type="text"
    id="sourceTCPFlagsDescription"
    name="sourceTCPFlagsDescription"
    value={inputValues.sourceTCPFlagsDescription}
    onChange={handleInputChange}
    placeholder="Enter source TCP flags"
    className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
  />
</div>
<div className="space-y-2">
  <label htmlFor="destinationTCPFlagsDescription" className="block text-sm font-medium text-purple-800">
    Destination TCP Flags
  </label>
  <Input
    type="text"
    id="destinationTCPFlagsDescription"
    name="destinationTCPFlagsDescription"
    value={inputValues.destinationTCPFlagsDescription}
    onChange={handleInputChange}
    placeholder="Enter destination TCP flags"
    className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
  />
</div>

{/* Start and Stop DateTime */}
<div className="space-y-2 col-span-2">
  <label htmlFor="startDateTime" className="block text-sm font-medium text-purple-800">
    Start Date and Time
  </label>
  <Input
    type="datetime-local"
    id="startDateTime"
    name="startDateTime"
    value={inputValues.startDateTime.replace(' ', 'T')}
    onChange={handleInputChange}
    className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800"
    required
  />
</div>
<div className="space-y-2 col-span-2">
  <label htmlFor="stopDateTime" className="block text-sm font-medium text-purple-800">
    Stop Date and Time
  </label>
  <Input
    type="datetime-local"
    id="stopDateTime"
    name="stopDateTime"
    value={inputValues.stopDateTime.replace(' ', 'T')}
    onChange={handleInputChange}
    className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 text-purple-800"
    required
  />
</div>
</div>

{/* Form Actions */}
<div className="flex space-x-4">
<Button 
  type="submit" 
  className="flex-1 bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-400" 
  disabled={!selectedModel || isLoading}
>
  {isLoading ? 'Predicting...' : 'Predict Attack Type'}
</Button>
<Button 
  type="button" 
  variant="outline" 
  className="border-purple-300 text-purple-700 hover:bg-purple-50"
  onClick={resetForm}
  disabled={isLoading}
>
  Reset
</Button>
</div>

{/* Error Display */}
{error && (
<Alert variant="destructive" className="bg-red-50 border-red-200">
  <AlertTitle className="text-red-800">Error</AlertTitle>
  <AlertDescription className="text-red-600">{error}</AlertDescription>
</Alert>
)}

{/* Results Display */}
{predictionResult && (
<Alert className="bg-purple-50 border-purple-200">
  <ShieldCheck className="h-6 w-6 text-purple-600" />
  <AlertTitle className="text-purple-800">Prediction Result</AlertTitle>
  <AlertDescription className="space-y-2 text-purple-700">
    <div>Attack Type: <span className="font-semibold text-purple-900">{predictionResult.attack_type}</span></div>
    <div>Confidence: <span className="font-semibold text-purple-900">{(predictionResult.confidence * 100).toFixed(2)}%</span></div>
    <div className="text-sm text-purple-600">
      Source IP: {inputValues.sourceip} → Destination IP: {inputValues.destinationip}
    </div>
  </AlertDescription>
</Alert>
)}
</form>
</CardContent>
</Card>
</div>
);
};

export default Predict_ml;