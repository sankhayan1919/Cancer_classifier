
import { useState } from "react";
import { BreastCancerForm } from "@/components/BreastCancerForm";
import { ResultDisplay } from "@/components/ResultDisplay";
import medicalImage from '@/assets/medical-research.jpg';

const Index = () => {
  const [result, setResult] = useState(null);
  const [showForm, setShowForm] = useState(true);
  
  const handleResultsReady = (detectionResult) => {
    setResult(detectionResult);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReset = () => {
    setResult(null);
    setShowForm(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
      <div 
        className="absolute inset-0 z-0 opacity-10 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${medicalImage})`,
          filter: 'blur(2px)' 
        }}
      />
      
      <header className="relative bg-white shadow-sm py-12 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-4">
            Breast Cancer Detection Tool
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-slate-600 text-lg">
              Enter diagnostic measurements to receive a preliminary assessment of breast cancer likelihood.
            </p>
            <p className="text-center text-red-500 font-medium mt-2 text-sm">
              This tool is for educational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-start">
          {showForm ? (
            <div className="bg-white/90 rounded-xl shadow-lg p-6 border border-blue-100 backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                  Enter Diagnostic Measurements
                </h2>
                <p className="text-gray-600">
                  Please provide the following measurements from the diagnostic test. All fields are required for accurate analysis.
                </p>
              </div>
              <BreastCancerForm onResultsReady={handleResultsReady} />
            </div>
          ) : (
            <div className="py-8">
              <ResultDisplay result={result} onReset={handleReset} />
            </div>
          )}
          
          <div className="bg-blue-50/80 rounded-xl p-6 shadow-md border border-blue-100 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              Understanding the Analysis
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                This tool analyzes various cellular measurements to assess the likelihood of breast cancer presence.
              </p>
              <p>
                The measurements include characteristics such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Cell radius and texture</li>
                <li>Perimeter and area</li>
                <li>Smoothness and compactness</li>
                <li>Concavity measurements</li>
                <li>Symmetry analysis</li>
              </ul>
              <p className="text-blue-700 font-medium mt-4">
                Always consult healthcare professionals for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-800 text-white py-12 mt-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Important Disclaimer</h3>
              <p className="text-slate-300">
                This breast cancer detection tool is provided for educational and informational purposes only.
                It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Medical Advice</h3>
              <p className="text-slate-300">
                Always seek the advice of your physician or other qualified health provider with any questions
                you may have regarding a medical condition.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Breast Cancer Detection Tool - For Educational Purposes Only
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
