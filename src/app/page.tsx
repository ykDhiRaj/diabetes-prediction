import DiabetesForm from '@/components/DiabetesForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 text-black">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Diabetes Prediction App</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          This application uses machine learning to predict diabetes risk based on various health metrics.
          Please enter your information accurately for the best results.
        </p>
        <DiabetesForm />
      </div>
    </main>
  );
}