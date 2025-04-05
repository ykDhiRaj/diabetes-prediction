from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import os

app = FastAPI()

# Enable CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiabetesInputData(BaseModel):
    pregnancies: float
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    diabetes_pedigree: float
    age: float

class PredictionResponse(BaseModel):
    prediction: int
    prediction_probability: float
    risk_level: str

# Load your pre-trained model and scaler
model_path = "svm_model.pkl"
scaler_path = "scaler.pkl"

if not (os.path.exists(model_path) and os.path.exists(scaler_path)):
    raise FileNotFoundError("Required model files not found")

print("Loading existing model...")
model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

@app.get("/")
async def root():
    return {"message": "Diabetes Prediction API"}

@app.post("/predict/", response_model=PredictionResponse)
async def predict_diabetes(data: DiabetesInputData):
    try:
        # Convert input to numpy array
        input_data = np.array([
            data.pregnancies,
            data.glucose,
            data.blood_pressure,
            data.skin_thickness,
            data.insulin,
            data.bmi,
            data.diabetes_pedigree,
            data.age
        ]).reshape(1, -1)
        
        # Standardize the input
        std_data = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(std_data)[0]
        
        # Get probability - check if model supports predict_proba
        if hasattr(model, 'predict_proba'):
            prediction_proba = model.predict_proba(std_data)[0][1]
        else:
            # Use decision function as fallback if probability not available
            prediction_proba = (model.decision_function(std_data)[0] + 1) / 2
        
        # Determine risk level
        risk_level = "High" if prediction_proba > 0.7 else "Medium" if prediction_proba > 0.3 else "Low"
        
        return {
            "prediction": int(prediction),
            "prediction_probability": float(prediction_proba),
            "risk_level": risk_level
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)