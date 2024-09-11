from flask import Flask, request, jsonify
import pandas as pd
import pickle
import json
import numpy as np
import plotly.express as px
import plotly
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = pickle.load(open("random_forest_regressor_salary_predictor_1.pkl", "rb"))

# Feature columns expected by the model
expected_features = ['Age', 'Years of Experience', 'Education Level_Master\'s', 'Education Level_PhD', 'Gender_Male']
df1 = pd.read_csv('Salary Data.csv')
# Load CSV data (for visualizations)
df = pd.read_csv('Salary Data.csv')

# Data preprocessing (convert categorical columns to numerical where needed)
df['Gender'] = df['Gender'].map({'Male': 1, 'Female': 0})
df = pd.get_dummies(df, columns=['Education Level'], drop_first=True)

@app.route('/')
def home():
    return "Welcome to the Salary Prediction and Data Visualization API!"

# Prediction API endpoint
@app.route('/predict', methods=['POST'])
def predict_salary():
    data = request.get_json()
    age = data.get('age', 30)
    experience = data.get('experience', 5)
    education = data.get('education', "Bachelor's")  
    gender = data.get('gender', "Female")

    # Prepare input features based on the schema expected by the model
    features_dict = {
        'Age': age,
        'Years of Experience': experience,
        'Education Level_Master\'s': 1 if education == "Master's" else 0,
        'Education Level_PhD': 1 if education == "PhD" else 0,
        'Gender_Male': 1 if gender == "Male" else 0
    }

    features_df = pd.DataFrame([features_dict], columns=expected_features)
    predicted_salary = model.predict(features_df)[0]

    return jsonify({
        'age': age,
        'experience': experience,
        'education': education,
        'gender': gender,
        'predicted_salary': predicted_salary
    })

# Endpoint to serve data from the CSV file
@app.route('/data', methods=['GET'])
def get_data():
    data_json = df1.to_json(orient='records')
    return jsonify(data_json)

@app.route("/api/heatmap", methods=["GET"])
def get_heatmap_data():
    correlation = df.corr(numeric_only=True)  
    fig = px.imshow(
        correlation,
        template="plotly_dark",
        text_auto="0.2f",
        aspect=1,
        color_continuous_scale="purpor",
        title="Correlation Heatmap of Data",
        height=650,
    )
    return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

@app.route("/api/scatter-matrix", methods=["GET"])
def get_scatter_matrix_data():
    fig = px.scatter_matrix(
        df,
        dimensions=df.select_dtypes(include="number").columns,  # Include one-hot encoded columns
        height=800,
        opacity=0.65,
        title="Relationships Between Numerical Data",
        template="plotly_dark"
    )
    return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

# Scatter plot for specific relation between two features
@app.route("/api/relation-scatter", methods=["GET"])
def get_relation_scatter():
    x = request.args.get('x')
    y = request.args.get('y')

    if df[x].nunique() == 2 or df[y].nunique() == 2:
        fig = px.scatter(
            data_frame=df,
            x=x,
            y=y,
            opacity=0.78,
            title=f"Scatter plot between {x} and {y}",
            template="plotly_dark",
            height=650
        )
    else:
        fig = px.scatter(
            data_frame=df,
            x=x,
            y=y,
            opacity=0.78,
            title=f"Scatter plot between {x} and {y} with trendline",
            template="plotly_dark",
            trendline="ols",
            height=650
        )

    return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

# Model information endpoint
@app.route('/model_info', methods=['GET'])
def model_info():
    return jsonify({
        'expected_features': expected_features
    })

# New endpoint for numerical data summary
@app.route('/data_summary', methods=['GET'])
def data_summary():
    numerical_summary = df1.describe().T
    summary_dict = numerical_summary.to_dict(orient='index')
    return jsonify(summary_dict)

if __name__ == '__main__':
    app.run(debug=True)
