import sys
import json
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import socket
import struct
import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
# Placeholder for custom objects function
def get_custom_objects():
    # Define any custom layers or functions here, if needed
    return {}


# Helper function to process time into seconds
# Helper function to process time into seconds
def process_time(time):
    try:
        # If the time includes a date, split it and extract only the time
        if " " in time:
            time = time.split(" ")[-1]
        # Split the time into hours and minutes, assuming HH:MM:SS format
        h, m, s = map(int, time.split(":"))
        return 3600 * h + 60 * m + s
    except Exception as e:
        raise ValueError(f"Invalid time format: {time}")



# Helper function to transform TCP flags
def flags_transform(flags):
    value = 0
    if isinstance(flags, str):
        flags = flags.replace(" ", "")
        for c in flags:
            if c != ',':
                value += ord(c)
    return value


# Predict attack type
def predict_attack_type(model_path, result):
    try:
        # Drop unnecessary columns
        result.drop(
            columns=["Unnamed: 0", "sourcePayloadAsBase64", "sourcePayloadAsUTF",
                     "destinationPayloadAsBase64", "destinationPayloadAsUTF", "generated"],
            inplace=True,
            errors="ignore"
        )

        # Convert IP addresses to numeric format
        result["sourceip"] = result["sourceip"].apply(
            lambda ip: struct.unpack("!I", socket.inet_aton(ip))[0]
        )
        result["destinationip"] = result["destinationip"].apply(
            lambda ip: struct.unpack("!I", socket.inet_aton(ip))[0]
        )
        print(result["startDateTime"] )
        # Process time columns
        result["startDateTime"] = result["startDateTime"].apply(process_time)
        result["stopDateTime"] = result["stopDateTime"].apply(process_time)

        # Transform TCP flags
        result["sourceTCPFlagsDescription"] = result["sourceTCPFlagsDescription"].apply(flags_transform)
        result["destinationTCPFlagsDescription"] = result["destinationTCPFlagsDescription"].apply(flags_transform)

        # Encode categorical features
        for col in ["protocolName", "appName", "direction"]:
            result[col] = result[col].astype("category").cat.codes

        # Encode labels (if present)
        if "Label" in result.columns:
            attack_dict = {"Normal": 0, "Attack": 1}
            result["Label"] = result["Label"].apply(lambda x: attack_dict.get(x, 0))

        # Fill missing values
        result = result.fillna(0)

        # Load the model with custom objects (if any)
        '''
        custom_objects = get_custom_objects()
        with tf.keras.utils.custom_object_scope(custom_objects):
            model = load_model(model_path)
        '''
        model = load_model(model_path)
        # Convert DataFrame to NumPy array
        input_array = result.to_numpy(dtype=np.float32)

        # Make predictions
        predictions = model.predict(input_array, verbose=0)

        # Define attack types
        attack_types = ['Normal', 'Attack', 'Attack', 'Attack', 'Attack']
        predicted_class_index = np.argmax(predictions, axis=1)[0]
        predicted_class = attack_types[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index])

        return {
            'attack_type': predicted_class,
            'confidence': confidence,
            'full_probabilities': predictions[0].tolist()
        }

    except Exception as e:
        return {
            'error': str(type(e).__name__),
            'message': str(e),
            'details': f'Error during prediction: {repr(e)}'
        }


# Main function
# Modified predict.py - Main function
def main():
    print("Python script started")
    print(f"Arguments received: {len(sys.argv)}")
    print(f"System arguments: {sys.argv}")

    if len(sys.argv) < 3:
        error_response = {
            'error': 'Insufficient arguments',
            'usage': 'python predict.py <model_path> <json_string>'
        }
        print(json.dumps(error_response))
        sys.exit(1)

    model_path = sys.argv[1]
    input_string = sys.argv[2]

    print(f"Model Path: {model_path}")
    print(f"Input string received: {input_string}")

    try:
        # Verify model file exists
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")

        # Parse the input JSON string
        data_dict = json.loads(input_string)
        print(f"Parsed data dictionary: {data_dict}")

        # Convert to DataFrame
        df = pd.DataFrame([data_dict])
        print("Input DataFrame structure:")
        print(df.info())
        print("\nDataFrame head:")
        print(df.head())

        # Make prediction
        result = predict_attack_type(model_path, df)
        print("Prediction result:")
        print(json.dumps(result))

    except json.JSONDecodeError as je:
        error_response = {
            'error': 'JSON parsing error',
            'details': str(je),
            'input_received': input_string
        }
        print(json.dumps(error_response))
    except Exception as e:
        error_response = {
            'error': str(type(e).__name__),
            'message': str(e),
            'details': f'Error during prediction: {repr(e)}'
        }
        print(json.dumps(error_response))
        print(f"Full error details: {str(e)}", file=sys.stderr)

if __name__ == "__main__":
    main()
