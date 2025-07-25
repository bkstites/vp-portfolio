import { NextRequest, NextResponse } from 'next/server';

// Types for our prediction logic
interface VitalSigns {
  spo2: number;
  rr: number; // respiratory rate
  hr: number; // heart rate
  sbp: number; // systolic blood pressure
  gcs_eye: number;
  gcs_verbal: number;
  gcs_motor: number;
}

interface PredictionResult {
  rox_score: number;
  gcs_total: number;
  rpp_score: number;
  respiratory_risk: string;
  neurological_risk: string;
  cardiovascular_risk: string;
  overall_risk: string;
  risk_level: 'Low' | 'Moderate' | 'High' | 'Critical';
}

// Calculate ROX score (SpO2/FiO2 ratio / Respiratory Rate)
function calculateROX(spo2: number, rr: number): number {
  // Assuming FiO2 is 21% (room air) for pre-hospital setting
  const fio2 = 0.21;
  const spo2_fio2_ratio = spo2 / fio2;
  return spo2_fio2_ratio / rr;
}

// Calculate GCS total
function calculateGCSTotal(eye: number, verbal: number, motor: number): number {
  return eye + verbal + motor;
}

// Calculate RPP (Rate Pressure Product)
function calculateRPP(hr: number, sbp: number): number {
  return hr * sbp;
}

// Determine risk levels based on scores
function determineRiskLevels(rox: number, gcs: number, rpp: number): {
  respiratory: string;
  neurological: string;
  cardiovascular: string;
  overall: string;
  risk_level: 'Low' | 'Moderate' | 'High' | 'Critical';
} {
  // Respiratory risk based on ROX score
  let respiratory = 'Low';
  if (rox < 4.88) respiratory = 'High';
  else if (rox < 7.5) respiratory = 'Moderate';

  // Neurological risk based on GCS
  let neurological = 'Low';
  if (gcs <= 8) neurological = 'Critical';
  else if (gcs <= 12) neurological = 'High';
  else if (gcs <= 14) neurological = 'Moderate';

  // Cardiovascular risk based on RPP
  let cardiovascular = 'Low';
  if (rpp > 12000) cardiovascular = 'High';
  else if (rpp > 8000) cardiovascular = 'Moderate';

  // Overall risk assessment
  const risks = [respiratory, neurological, cardiovascular];
  const criticalCount = risks.filter(r => r === 'Critical').length;
  const highCount = risks.filter(r => r === 'High').length;
  const moderateCount = risks.filter(r => r === 'Moderate').length;

  let overall = 'Low';
  let risk_level: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';

  if (criticalCount > 0) {
    overall = 'Critical';
    risk_level = 'Critical';
  } else if (highCount >= 2) {
    overall = 'High';
    risk_level = 'High';
  } else if (highCount === 1 || moderateCount >= 2) {
    overall = 'Moderate';
    risk_level = 'Moderate';
  }

  return { respiratory, neurological, cardiovascular, overall, risk_level };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const vitals: VitalSigns = {
      spo2: Number(body.spo2),
      rr: Number(body.rr),
      hr: Number(body.hr),
      sbp: Number(body.sbp),
      gcs_eye: Number(body.gcs_eye),
      gcs_verbal: Number(body.gcs_verbal),
      gcs_motor: Number(body.gcs_motor),
    };

    // Validate inputs
    if (Object.values(vitals).some(val => isNaN(val) || val < 0)) {
      return NextResponse.json(
        { error: 'Invalid vital signs data' },
        { status: 400 }
      );
    }

    // Calculate scores
    const rox_score = calculateROX(vitals.spo2, vitals.rr);
    const gcs_total = calculateGCSTotal(vitals.gcs_eye, vitals.gcs_verbal, vitals.gcs_motor);
    const rpp_score = calculateRPP(vitals.hr, vitals.sbp);

    // Determine risk levels
    const riskAssessment = determineRiskLevels(rox_score, gcs_total, rpp_score);

    const result: PredictionResult = {
      rox_score: Math.round(rox_score * 100) / 100, // Round to 2 decimal places
      gcs_total,
      rpp_score,
      respiratory_risk: riskAssessment.respiratory,
      neurological_risk: riskAssessment.neurological,
      cardiovascular_risk: riskAssessment.cardiovascular,
      overall_risk: riskAssessment.overall,
      risk_level: riskAssessment.risk_level,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to process prediction' },
      { status: 500 }
    );
  }
} 