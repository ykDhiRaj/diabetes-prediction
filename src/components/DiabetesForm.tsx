"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormData = {
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree: number;
  age: number;
};

const initialFormData: FormData = {
  pregnancies: 0,
  glucose: 0,
  blood_pressure: 0,
  skin_thickness: 0,
  insulin: 0,
  bmi: 0,
  diabetes_pedigree: 0,
  age: 0,
};

export default function DiabetesForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      
      // Store the result in localStorage to access it on the results page
      localStorage.setItem('predictionResult', JSON.stringify(result));
      
      // Navigate to results page
      router.push('/results');
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-center">Diabetes Risk Assessment</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Pregnancies</label>
          <input
            type="number"
            name="pregnancies"
            value={formData.pregnancies}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            step="1"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Glucose (mg/dL)</label>
          <input
            type="number"
            name="glucose"
            value={formData.glucose}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Blood Pressure (mm Hg)</label>
          <input
            type="number"
            name="blood_pressure"
            value={formData.blood_pressure}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Skin Thickness (mm)</label>
          <input
            type="number"
            name="skin_thickness"
            value={formData.skin_thickness}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Insulin (mu U/ml)</label>
          <input
            type="number"
            name="insulin"
            value={formData.insulin}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">BMI</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.1"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Diabetes Pedigree Function</label>
          <input
            type="number"
            name="diabetes_pedigree"
            value={formData.diabetes_pedigree}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.001"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
        >
          {isLoading ? 'Predicting...' : 'Predict Diabetes Risk'}
        </button>
      </form>
    </div>
  );
}