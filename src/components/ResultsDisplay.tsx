"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type PredictionResult = {
  prediction: number;
  prediction_probability: number;
  risk_level: string;
};

export default function ResultsDisplay() {
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    // Get the prediction result from localStorage
    const storedResult = localStorage.getItem('predictionResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-black">
        <p className="text-lg mb-4">No prediction result found.</p>
        <Link 
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Go Back to Form
        </Link>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAdvice = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'Please consult with a healthcare professional as soon as possible for a proper diagnosis and personalized advice.';
      case 'Medium':
        return 'Consider scheduling a check-up with your doctor to discuss your diabetes risk factors.';
      case 'Low':
        return 'Continue maintaining a healthy lifestyle with proper diet and regular exercise.';
      default:
        return 'Consult with a healthcare professional for personalized advice.';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Diabetes Risk Assessment Results</h2>
      
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          <span className="font-medium">Prediction:</span>
          <span>{result.prediction === 1 ? 'Positive (At Risk)' : 'Negative (Not At Risk)'}</span>
        </div>
        
        <div className="flex justify-between mb-3">
          <span className="font-medium">Probability:</span>
          <span>{(result.prediction_probability * 100).toFixed(2)}%</span>
        </div>
        
        <div className="flex justify-between mb-3">
          <span className="font-medium">Risk Level:</span>
          <span className={`font-bold ${getRiskColor(result.risk_level)}`}>{result.risk_level}</span>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-lg mb-2">Recommendation</h3>
        <p>{getAdvice(result.risk_level)}</p>
      </div>
      
      <div className="text-sm text-gray-600 mb-6">
        <p className="mb-2">
          <strong>Note:</strong> This prediction is based on machine learning and should not replace 
          professional medical advice.
        </p>
        <p>
          Always consult with healthcare professionals for proper diagnosis and treatment plans.
        </p>
      </div>
      
      <div className="flex justify-center">
        <Link 
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Make Another Prediction
        </Link>
      </div>
    </div>
  );
}