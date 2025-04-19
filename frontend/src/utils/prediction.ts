
import type { CancerDetectionResult } from "@/components/BreastCancerForm";

// This is a simplified mock function to simulate breast cancer prediction
// In a real application, this would call a trained ML model API
export function predictCancer(data: Record<string, number>): CancerDetectionResult {
  // Simple heuristic for demonstration purposes only
  // In reality, this would be a proper machine learning model
  
  const riskFactors = [
    // Higher values of these typically indicate higher cancer risk
    data.mean_radius > 15,
    data.mean_texture > 20,
    data.mean_perimeter > 100,
    data.mean_area > 750,
    data.mean_concavity > 0.3,
    data.mean_concave_points > 0.15,
    data.worst_radius > 25,
    data.worst_texture > 25,
    data.worst_perimeter > 180,
    data.worst_area > 2000,
    data.worst_concavity > 0.7,
    data.worst_concave_points > 0.25,
  ];
  
  // Count how many risk factors are present
  const riskCount = riskFactors.filter(Boolean).length;
  
  // Calculate a simplified risk ratio (0 to 1)
  const riskRatio = riskCount / riskFactors.length;
  
  // Add some randomness to make it more realistic
  // (would not be in a real model, just for demo)
  const randomFactor = 0.15;
  const adjustedRatio = Math.min(
    1, 
    Math.max(0, riskRatio + (Math.random() * randomFactor - randomFactor/2))
  );
  
  // Determine prediction based on threshold
  const malignancyThreshold = 0.5;
  const prediction = adjustedRatio >= malignancyThreshold ? "malignant" : "benign";
  
  // Calculate confidence (higher near extremes, lower near threshold)
  const distanceFromThreshold = Math.abs(adjustedRatio - malignancyThreshold);
  const confidenceBase = 0.5 + (distanceFromThreshold * 0.9);
  const confidence = Math.min(0.99, Math.max(0.7, confidenceBase));
  
  return {
    prediction: prediction as "malignant" | "benign",
    confidence,
  };
}
