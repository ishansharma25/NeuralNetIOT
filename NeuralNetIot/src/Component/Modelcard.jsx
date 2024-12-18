import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ModelCard({ model }) {
  const [showPros, setShowPros] = useState(true);

  return (
    <Card className="bg-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-purple-800">{model.name}</CardTitle>
        <CardDescription>{model.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2 text-purple-700">{showPros ? 'Pros' : 'Cons'}</h3>
        <ul className="list-disc pl-5">
          {(showPros ? model.pros : model.cons).map((item, index) => (
            <li key={index} className="text-purple-900">{item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => setShowPros(!showPros)} 
          variant="outline"
          className="w-full bg-purple-500 text-white hover:bg-purple-600"
        >
          Show {showPros ? 'Cons' : 'Pros'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ModelCard;
