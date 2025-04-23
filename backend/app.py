import requests
import gradio as gr
import numpy as np
import joblib
from tensorflow.keras.models import load_model
import os

# Load the Keras model (.h5)
model = load_model("breast_cancer_model.h5")

# Load the saved scaler (fitted on x_train)
scaler = joblib.load("scaler.pkl")

# Define prediction function
def predict(
    meanRadius, meanTexture, meanPerimeter, meanArea, meanSmoothness,
    meanCompactness, meanConcavity, meanConcavePoints, meanSymmetry,
    meanFractalDimension, radiusError, textureError, perimeterError,
    areaError, smoothnessError, compactnessError, concavityError,
    concavePointsError, symmetryError, fractalDimensionError, worstRadius,
    worstTexture, worstPerimeter, worstArea, worstSmoothness,
    worstCompactness, worstConcavity, worstConcavePoints, worstSymmetry,
    worstFractalDimension
):
    input_data = {
        "meanRadius": meanRadius,
        "meanTexture": meanTexture,
        "meanPerimeter": meanPerimeter,
        "meanArea": meanArea,
        "meanSmoothness": meanSmoothness,
        "meanCompactness": meanCompactness,
        "meanConcavity": meanConcavity,
        "meanConcavePoints": meanConcavePoints,
        "meanSymmetry": meanSymmetry,
        "meanFractalDimension": meanFractalDimension,
        "radiusError": radiusError,
        "textureError": textureError,
        "perimeterError": perimeterError,
        "areaError": areaError,
        "smoothnessError": smoothnessError,
        "compactnessError": compactnessError,
        "concavityError": concavityError,
        "concavePointsError": concavePointsError,
        "symmetryError": symmetryError,
        "fractalDimensionError": fractalDimensionError,
        "worstRadius": worstRadius,
        "worstTexture": worstTexture,
        "worstPerimeter": worstPerimeter,
        "worstArea": worstArea,
        "worstSmoothness": worstSmoothness,
        "worstCompactness": worstCompactness,
        "worstConcavity": worstConcavity,
        "worstConcavePoints": worstConcavePoints,
        "worstSymmetry": worstSymmetry,
        "worstFractalDimension": worstFractalDimension
    }
    
    try:
        response = requests.post(
            "https://sreecode09-cancer-detection.hf.space/predict",
            json=input_data
        )
        response.raise_for_status()
        return response.json()['result']
    except Exception as e:
        return f"Error: {str(e)}"

# Feature labels
features = [
    "meanRadius", "meanTexture", "meanPerimeter", "meanArea", "meanSmoothness",
    "meanCompactness", "meanConcavity", "meanConcavePoints", "meanSymmetry",
    "meanFractalDimension", "radiusError", "textureError", "perimeterError",
    "areaError", "smoothnessError", "compactnessError", "concavityError",
    "concavePointsError", "symmetryError", "fractalDimensionError", "worstRadius",
    "worstTexture", "worstPerimeter", "worstArea", "worstSmoothness",
    "worstCompactness", "worstConcavity", "worstConcavePoints", "worstSymmetry",
    "worstFractalDimension"
]

# Input fields
inputs = [gr.Number(label=feature) for feature in features]

# Create and launch the interface
app = gr.Interface(
    fn=predict,
    inputs=inputs,
    outputs="text",
    title="Breast Cancer Prediction App",
    description="Enter the 30 input values to predict whether the tumor is Malignant or Benign."
)

if __name__ == '__main__':
    port = int(os.environ.get("API_PORT", 5000))  # Changed from PORT to API_PORT
    app.launch(server_port=port)  # For Gradio interface