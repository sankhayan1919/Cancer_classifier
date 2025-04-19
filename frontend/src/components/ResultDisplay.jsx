
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function ResultDisplay({ result, onReset }) {
  if (!result) return null;

  const { prediction, confidence } = result;
  const isMalignant = prediction === "malignant";
  
  return (
    <Card className={`w-full max-w-lg mx-auto border-2 shadow-lg ${isMalignant ? 'border-red-300' : 'border-green-300'}`}>
      <CardHeader className={`${isMalignant ? 'bg-red-50' : 'bg-green-50'} rounded-t-lg`}>
        <div className="flex items-center justify-center mb-2">
          {isMalignant ? (
            <AlertCircle size={48} className="text-red-500" />
          ) : (
            <CheckCircle size={48} className="text-green-500" />
          )}
        </div>
        <CardTitle className="text-center text-2xl">
          {isMalignant ? "Potentially Malignant" : "Likely Benign"}
        </CardTitle>
        <CardDescription className="text-center text-base">
          {isMalignant 
            ? "The analysis indicates potential malignancy. Please consult with a healthcare professional immediately." 
            : "The analysis suggests benign characteristics. However, always consult with a medical professional."}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Confidence Level</span>
              <span className="text-sm font-medium">{Math.round(confidence * 100)}%</span>
            </div>
            <Progress 
              value={confidence * 100} 
              className={`h-3 ${isMalignant ? 'bg-red-100' : 'bg-green-100'}`}
              indicatorClassName={isMalignant ? 'bg-red-500' : 'bg-green-500'}
            />
          </div>
          
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <Info size={20} className="text-blue-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              This is only a preliminary analysis and should not replace professional medical advice. 
              Please consult with a doctor for proper diagnosis.
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center pb-6">
        <Button 
          onClick={onReset} 
          variant="outline" 
          className="border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          Perform Another Analysis
        </Button>
      </CardFooter>
    </Card>
  );
}
