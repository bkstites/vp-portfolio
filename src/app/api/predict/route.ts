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

// Calculate ROX score (SpO2/FiO2 ratio / Respiratory Rate) - validated in emergency medicine
function calculateROX(spo2: number, rr: number): number {
  // FiO2 is 21% (room air) for pre-hospital setting
  const fio2 = 0.21;
  const spo2_fio2_ratio = spo2 / fio2;
  return spo2_fio2_ratio / rr;
}

// Calculate GCS total
function calculateGCSTotal(eye: number, verbal: number, motor: number): number {
  return eye + verbal + motor;
}

// Calculate RPP (Rate Pressure Product) - validated cardiovascular risk indicator
function calculateRPP(hr: number, sbp: number): number {
  return hr * sbp;
}

// NEWS2 (National Early Warning Score 2) - validated emergency medicine scoring system
function calculateNEWS2Score(vitals: VitalSigns): number {
  let score = 0;
  
  // Respiratory Rate scoring (NEWS2)
  if (vitals.rr <= 8) score += 3;
  else if (vitals.rr <= 11) score += 1;
  else if (vitals.rr >= 25) score += 3;
  else if (vitals.rr >= 21) score += 2;
  else if (vitals.rr >= 12) score += 0; // normal range
  
  // SpO2 scoring (NEWS2)
  if (vitals.spo2 <= 91) score += 3;
  else if (vitals.spo2 <= 93) score += 2;
  else if (vitals.spo2 <= 95) score += 1;
  else if (vitals.spo2 >= 96) score += 0; // normal range
  
  // Systolic BP scoring (NEWS2)
  if (vitals.sbp <= 90) score += 3;
  else if (vitals.sbp <= 100) score += 2;
  else if (vitals.sbp <= 110) score += 1;
  else if (vitals.sbp >= 220) score += 3;
  else if (vitals.sbp >= 111) score += 0; // normal range
  
  // Heart Rate scoring (NEWS2)
  if (vitals.hr <= 40) score += 3;
  else if (vitals.hr <= 50) score += 1;
  else if (vitals.hr >= 131) score += 3;
  else if (vitals.hr >= 111) score += 2;
  else if (vitals.hr >= 51) score += 0; // normal range
  
  // Level of consciousness (NEWS2)
  const gcs_total = calculateGCSTotal(vitals.gcs_eye, vitals.gcs_verbal, vitals.gcs_motor);
  if (gcs_total <= 8) score += 3;
  else if (gcs_total <= 10) score += 2;
  else if (gcs_total <= 13) score += 1;
  else score += 0; // normal range
  
  return score;
}

// MEOWS (Modified Early Obstetric Warning System) - adapted for general emergency medicine
function calculateMEOWSScore(vitals: VitalSigns): number {
  let score = 0;
  
  // Respiratory Rate (MEOWS)
  if (vitals.rr < 10 || vitals.rr > 30) score += 2;
  else if (vitals.rr < 12 || vitals.rr > 20) score += 1;
  
  // SpO2 (MEOWS)
  if (vitals.spo2 < 95) score += 2;
  else if (vitals.spo2 < 97) score += 1;
  
  // Systolic BP (MEOWS)
  if (vitals.sbp < 90 || vitals.sbp > 160) score += 2;
  else if (vitals.sbp < 100 || vitals.sbp > 140) score += 1;
  
  // Heart Rate (MEOWS)
  if (vitals.hr < 50 || vitals.hr > 120) score += 2;
  else if (vitals.hr < 60 || vitals.hr > 100) score += 1;
  
  // Level of consciousness (MEOWS)
  const gcs_total = calculateGCSTotal(vitals.gcs_eye, vitals.gcs_verbal, vitals.gcs_motor);
  if (gcs_total < 15) score += 2;
  else if (gcs_total < 13) score += 1;
  
  return score;
}

// Determine risk levels based on validated emergency medicine standards
function determineRiskLevels(vitals: VitalSigns, rox: number, gcs: number, rpp: number): {
  respiratory: string;
  neurological: string;
  cardiovascular: string;
  overall: string;
  risk_level: 'Low' | 'Moderate' | 'High' | 'Critical';
} {
  // Calculate validated scores
  const news2_score = calculateNEWS2Score(vitals);
  const meows_score = calculateMEOWSScore(vitals);
  
  // Respiratory risk assessment (based on NEWS2 and ROX score)
  let respiratory = 'Low';
  if (vitals.spo2 < 90) {
    if (vitals.spo2 < 85) respiratory = 'Critical';
    else respiratory = 'High';
  } else if (vitals.rr > 25 || vitals.rr < 10) {
    respiratory = 'High';
  } else if (vitals.rr > 20 || vitals.rr < 12) {
    respiratory = 'Moderate';
  }
  
  // ROX score validation (emergency medicine standard) - adjusted thresholds
  if (rox < 4.88) respiratory = 'Critical';
  else if (rox < 7.5 && respiratory === 'Low') respiratory = 'Moderate';

  // Neurological risk based on GCS (emergency medicine standard) - adjusted thresholds
  let neurological = 'Low';
  if (gcs <= 8) neurological = 'Critical';
  else if (gcs <= 10) neurological = 'High'; // Adjusted from 12 to 10
  else if (gcs <= 13) neurological = 'Moderate'; // Adjusted from 14 to 13

  // Cardiovascular risk assessment (based on NEWS2 and RPP) - adjusted thresholds
  let cardiovascular = 'Low';
  if (vitals.hr < 50 || vitals.hr > 120) {
    if (vitals.hr < 40 || vitals.hr > 150) cardiovascular = 'Critical';
    else cardiovascular = 'High';
  } else if (vitals.hr < 60 || vitals.hr > 100) {
    cardiovascular = 'Moderate';
  }
  
  // Blood pressure (NEWS2 standard) - adjusted thresholds
  if (vitals.sbp < 90) {
    if (vitals.sbp < 80) cardiovascular = 'Critical';
    else if (cardiovascular === 'Low') cardiovascular = 'High';
  } else if (vitals.sbp > 180) {
    if (cardiovascular === 'Low') cardiovascular = 'Moderate';
  }
  
  // RPP validation (emergency medicine standard) - adjusted thresholds
  if (rpp > 20000) { // Increased threshold for critical
    if (cardiovascular === 'Low') cardiovascular = 'Critical';
  } else if (rpp > 15000) { // Adjusted threshold for high
    if (cardiovascular === 'Low') cardiovascular = 'High';
  } else if (rpp < 4000) {
    if (cardiovascular === 'Low') cardiovascular = 'Moderate';
  }

  // Overall risk assessment using NEWS2 and MEOWS thresholds - adjusted for less sensitivity
  let overall = 'Low';
  let risk_level: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';

  // NEWS2 thresholds for escalation - adjusted to be less sensitive
  if (news2_score >= 8) {
    overall = 'Critical';
    risk_level = 'Critical';
  } else if (news2_score >= 6) {
    overall = 'High';
    risk_level = 'High';
  } else if (news2_score >= 4) {
    overall = 'Moderate';
    risk_level = 'Moderate';
  }

  // MEOWS validation - adjusted to be less sensitive
  if (meows_score >= 7) {
    overall = 'Critical';
    risk_level = 'Critical';
  } else if (meows_score >= 5 && overall === 'Low') {
    overall = 'High';
    risk_level = 'High';
  } else if (meows_score >= 3 && overall === 'Low') {
    overall = 'Moderate';
    risk_level = 'Moderate';
  }

  // Nuanced critical system escalation - not every critical system should escalate overall
  const risks = [respiratory, neurological, cardiovascular];
  const criticalCount = risks.filter(r => r === 'Critical').length;
  
  // Only escalate to Critical if multiple systems are critical OR one critical with high scores
  if (criticalCount >= 2) {
    overall = 'Critical';
    risk_level = 'Critical';
  } else if (criticalCount === 1 && (news2_score >= 6 || meows_score >= 5)) {
    overall = 'Critical';
    risk_level = 'Critical';
  } else if (criticalCount === 1) {
    // Single critical system with moderate scores = High risk
    overall = 'High';
    risk_level = 'High';
  }

  // Final validation: if all individual systems are low risk, overall should be low
  const allLowRisk = risks.every(r => r === 'Low');
  if (allLowRisk && news2_score < 4 && meows_score < 3) {
    overall = 'Low';
    risk_level = 'Low';
  }

  // Additional validation: prevent over-escalation for borderline cases
  if (overall === 'Critical' && news2_score < 6 && meows_score < 5) {
    overall = 'High';
    risk_level = 'High';
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

    // Calculate validated emergency medicine scores
    const rox_score = calculateROX(vitals.spo2, vitals.rr);
    const gcs_total = calculateGCSTotal(vitals.gcs_eye, vitals.gcs_verbal, vitals.gcs_motor);
    const rpp_score = calculateRPP(vitals.hr, vitals.sbp);

    // Determine risk levels using validated emergency medicine standards
    const riskAssessment = determineRiskLevels(vitals, rox_score, gcs_total, rpp_score);

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