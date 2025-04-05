import ResultsDisplay from '@/components/ResultsDisplay';

export default function Results() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Your Prediction Results</h1>
        <ResultsDisplay />
      </div>
    </main>
  );
}