from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import sklearn.datasets
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras

app = Flask(__name__)

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
        # Get input features from the request
        data = request.json
        input_data = np.array(data['features']).reshape(1, -1)

        # Standardize the input data
        input_data_std = scaler.transform(input_data)

        # Make a prediction
        prediction = model.predict(input_data_std)
        prediction_label = np.argmax(prediction)

        # Return the prediction result
        if prediction_label == 1:
            return jsonify({'prediction': 'Benign'})
        else:
            return jsonify({'prediction': 'Malignant'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)