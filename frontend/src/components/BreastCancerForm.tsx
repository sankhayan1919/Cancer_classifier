
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { predictCancer } from "@/utils/prediction";

// Form schema validation
const formSchema = z.object({
  mean_radius: z.coerce.number(),
  mean_texture: z.coerce.number(),
  mean_perimeter: z.coerce.number(),
  mean_area: z.coerce.number(),
  mean_smoothness: z.coerce.number(),
  mean_compactness: z.coerce.number(),
  mean_concavity: z.coerce.number(),
  mean_concave_points: z.coerce.number(),
  mean_symmetry: z.coerce.number(),
  mean_fractal_dimension: z.coerce.number(),
  radius_error: z.coerce.number(),
  texture_error: z.coerce.number(),
  perimeter_error: z.coerce.number(),
  area_error: z.coerce.number(),
  smoothness_error: z.coerce.number(),
  compactness_error: z.coerce.number(),
  concavity_error: z.coerce.number(),
  concave_points_error: z.coerce.number(),
  symmetry_error: z.coerce.number(),
  fractal_dimension_error: z.coerce.number(),
  worst_radius: z.coerce.number(),
  worst_texture: z.coerce.number(),
  worst_perimeter: z.coerce.number(),
  worst_area: z.coerce.number(),
  worst_smoothness: z.coerce.number(),
  worst_compactness: z.coerce.number(),
  worst_concavity: z.coerce.number(),
  worst_concave_points: z.coerce.number(),
  worst_symmetry: z.coerce.number(),
  worst_fractal_dimension: z.coerce.number(),
});

type FormValues = z.infer<typeof formSchema>;

export type CancerDetectionResult = {
  prediction: "malignant" | "benign";
  confidence: number;
};

interface BreastCancerFormProps {
  onResultsReady: (results: CancerDetectionResult) => void;
}

export function BreastCancerForm({ onResultsReady }: BreastCancerFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Default values for testing
  const defaultValues: FormValues = {
    mean_radius: 0,
    mean_texture: 0,
    mean_perimeter: 0,
    mean_area: 0,
    mean_smoothness: 0,
    mean_compactness: 0,
    mean_concavity: 0,
    mean_concave_points: 0,
    mean_symmetry: 0,
    mean_fractal_dimension: 0,
    radius_error: 0,
    texture_error: 0,
    perimeter_error: 0,
    area_error: 0,
    smoothness_error: 0,
    compactness_error: 0,
    concavity_error: 0,
    concave_points_error: 0,
    symmetry_error: 0,
    fractal_dimension_error: 0,
    worst_radius: 0,
    worst_texture: 0,
    worst_perimeter: 0,
    worst_area: 0,
    worst_smoothness: 0,
    worst_compactness: 0,
    worst_concavity: 0,
    worst_concave_points: 0,
    worst_symmetry: 0,
    worst_fractal_dimension: 0,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Get prediction
      const result = predictCancer(values);
      onResultsReady(result);
    } catch (error) {
      console.error("Error processing the data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Group fields for better organization
  const fieldGroups = [
    {
      title: "Mean Values",
      fields: [
        { name: "mean_radius", label: "Mean Radius" },
        { name: "mean_texture", label: "Mean Texture" },
        { name: "mean_perimeter", label: "Mean Perimeter" },
        { name: "mean_area", label: "Mean Area" },
        { name: "mean_smoothness", label: "Mean Smoothness" },
        { name: "mean_compactness", label: "Mean Compactness" },
        { name: "mean_concavity", label: "Mean Concavity" },
        { name: "mean_concave_points", label: "Mean Concave Points" },
        { name: "mean_symmetry", label: "Mean Symmetry" },
        { name: "mean_fractal_dimension", label: "Mean Fractal Dimension" },
      ],
    },
    {
      title: "Error Values",
      fields: [
        { name: "radius_error", label: "Radius Error" },
        { name: "texture_error", label: "Texture Error" },
        { name: "perimeter_error", label: "Perimeter Error" },
        { name: "area_error", label: "Area Error" },
        { name: "smoothness_error", label: "Smoothness Error" },
        { name: "compactness_error", label: "Compactness Error" },
        { name: "concavity_error", label: "Concavity Error" },
        { name: "concave_points_error", label: "Concave Points Error" },
        { name: "symmetry_error", label: "Symmetry Error" },
        { name: "fractal_dimension_error", label: "Fractal Dimension Error" },
      ],
    },
    {
      title: "Worst Values",
      fields: [
        { name: "worst_radius", label: "Worst Radius" },
        { name: "worst_texture", label: "Worst Texture" },
        { name: "worst_perimeter", label: "Worst Perimeter" },
        { name: "worst_area", label: "Worst Area" },
        { name: "worst_smoothness", label: "Worst Smoothness" },
        { name: "worst_compactness", label: "Worst Compactness" },
        { name: "worst_concavity", label: "Worst Concavity" },
        { name: "worst_concave_points", label: "Worst Concave Points" },
        { name: "worst_symmetry", label: "Worst Symmetry" },
        { name: "worst_fractal_dimension", label: "Worst Fractal Dimension" },
      ],
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ScrollArea className="h-[calc(100vh-250px)] pr-4">
          {fieldGroups.map((group) => (
            <Card key={group.title} className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4 text-blue-700">{group.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.fields.map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name as keyof FormValues}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>{field.label}</FormLabel>
                          <FormControl>
                            <Input type="number" step="any" {...formField} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Analyze Data"}
        </Button>
      </form>
    </Form>
  );
}
