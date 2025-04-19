from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
import numpy as np
import pandas as pd
import sklearn.datasets
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Load and prepare dataset
ds = sklearn.datasets.load_breast_cancer()
data_frame = pd.DataFrame(ds.data, columns=ds.feature_names)
data_frame['label'] = ds.target

x = data_frame.drop(columns='label', axis=1)
y = data_frame['label']

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=2)

# Standardization
scaler = StandardScaler()
x_train_std = scaler.fit_transform(x_train)
x_test_std = scaler.transform(x_test)

# Build and train the model
tf.random.set_seed(3)
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(30,)),
    keras.layers.Dense(20, activation='relu'),
    keras.layers.Dense(2, activation='sigmoid')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(x_train_std, y_train, validation_data=(x_test_std, y_test), epochs=10)

# Define prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Convert input data to numpy array
        input_features = [
            data['meanRadius'], data['meanTexture'], data['meanPerimeter'], 
            data['meanArea'], data['meanSmoothness'], data['meanCompactness'],
            data['meanConcavity'], data['meanConcavePoints'], data['meanSymmetry'],
            data['meanFractalDimension'], data['radiusError'], data['textureError'],
            data['perimeterError'], data['areaError'], data['smoothnessError'],
            data['compactnessError'], data['concavityError'], data['concavePointsError'],
            data['symmetryError'], data['fractalDimensionError'], data['worstRadius'],
            data['worstTexture'], data['worstPerimeter'], data['worstArea'],
            data['worstSmoothness'], data['worstCompactness'], data['worstConcavity'],
            data['worstConcavePoints'], data['worstSymmetry'], data['worstFractalDimension']
        ]
        
        input_array = np.array(input_features).reshape(1, -1)
        input_data_std = scaler.transform(input_array)

        prediction = model.predict(input_data_std)
        confidence = float(np.max(prediction))
        prediction_label = np.argmax(prediction)

        return jsonify({
            'prediction': 'benign' if prediction_label == 1 else 'malignant',
            'confidence': confidence
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'message': 'Failed to process the request'
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)