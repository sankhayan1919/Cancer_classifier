import gradio as gr
import numpy as np
import joblib
from tensorflow.keras.models import load_model

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
    input_data = np.array([[
        meanRadius, meanTexture, meanPerimeter, meanArea, meanSmoothness,
        meanCompactness, meanConcavity, meanConcavePoints, meanSymmetry,
        meanFractalDimension, radiusError, textureError, perimeterError,
        areaError, smoothnessError, compactnessError, concavityError,
        concavePointsError, symmetryError, fractalDimensionError, worstRadius,
        worstTexture, worstPerimeter, worstArea, worstSmoothness,
        worstCompactness, worstConcavity, worstConcavePoints, worstSymmetry,
        worstFractalDimension
    ]])

    input_scaled = scaler.transform(input_data)
    prediction = model.predict(input_scaled)[0][0]  # Assuming binary classification (output between 0 and 1)
    
    if prediction > 0.5:
        return f"Malignant (Confidence: {prediction:.2f})"
    else:
        return f"Benign (Confidence: {1 - prediction:.2f})"

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
    description="Enter the 30 input values to predict whether the tumor is Malignant or Benign using a deep learning model."
)

app.launch()