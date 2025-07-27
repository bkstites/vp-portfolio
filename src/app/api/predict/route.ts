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
  narrative_risk_score: number;
  narrative_insights: string[];
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

// Analyze narrative for trauma and medical keywords
function analyzeNarrative(narrative: string): { riskScore: number; insights: string[] } {
  const narrativeLower = narrative.toLowerCase();
  const insights: string[] = [];
  let riskScore = 0;

  // Trauma-specific keywords (HIGH RISK)
  const traumaKeywords = {
    'stabbed': 20,
    'shot': 20,
    'gunshot': 20,
    'knife': 15,
    'bleeding': 15,
    'wound': 10,
    'trauma': 15,
    'sucking chest wound': 25,
    'chest wound': 20,
    'penetrating': 20,
    'laceration': 10,
    'amputation': 25,
    'crush': 20,
    'fall': 10,
    'motor vehicle': 15,
    'mvc': 15,
    'accident': 10
  };

  // Medical emergency keywords (HIGH RISK)
  const medicalKeywords = {
    'chest pain': 20,
    'shortness of breath': 15,
    'unconscious': 20,
    'unresponsive': 20,
    'seizure': 15,
    'stroke': 20,
    'heart attack': 20,
    'cardiac arrest': 25,
    'not breathing': 25,
    'blue': 15,
    'cyanotic': 20,
    'pregnant': 10,
    'labor': 15,
    'bleeding heavily': 20,
    'vomiting blood': 20,
    'blood': 10
  };

  // Check for trauma keywords
  for (const [keyword, score] of Object.entries(traumaKeywords)) {
    if (narrativeLower.includes(keyword)) {
      riskScore += score;
      if (keyword === 'sucking chest wound') {
        insights.push('🚨 CRITICAL TRAUMA: Sucking chest wound - immediate chest seal required');
      } else if (keyword === 'stabbed') {
        insights.push('🚨 CRITICAL TRAUMA: Stabbing injury - assess for penetrating trauma');
      } else if (keyword === 'shot' || keyword === 'gunshot') {
        insights.push('🚨 CRITICAL TRAUMA: Gunshot wound - assess for penetrating trauma');
      } else {
        insights.push(`🚨 TRAUMA DETECTED: ${keyword} - assess for trauma protocols`);
      }
    }
  }

  // Check for medical emergency keywords
  for (const [keyword, score] of Object.entries(medicalKeywords)) {
    if (narrativeLower.includes(keyword)) {
      riskScore += score;
      if (keyword === 'chest pain') {
        insights.push('❤️ CARDIAC ALERT: Chest pain - prepare for cardiac assessment');
      } else if (keyword === 'unconscious' || keyword === 'unresponsive') {
        insights.push('🧠 NEUROLOGICAL ALERT: Unconscious patient - airway management priority');
      } else if (keyword === 'not breathing') {
        insights.push('🫁 RESPIRATORY ARREST: Not breathing - immediate airway intervention required');
      } else {
        insights.push(`⚠️ MEDICAL ALERT: ${keyword} detected`);
      }
    }
  }

  // Specific trauma interventions
  if (narrativeLower.includes('sucking chest wound') || narrativeLower.includes('chest wound')) {
    insights.push('🩹 TRAUMA INTERVENTION: Apply chest seal, monitor for tension pneumothorax');
    insights.push('🚨 CRITICAL: Prepare for immediate transport to trauma center');
  }

  if (narrativeLower.includes('stabbed') && narrativeLower.includes('chest')) {
    insights.push('🩹 TRAUMA INTERVENTION: Assess for cardiac tamponade, prepare for thoracotomy');
    insights.push('🚨 CRITICAL: Immediate trauma center transport required');
  }

  // Overall risk assessment
  if (riskScore >= 20) {
    insights.push('🚨 CRITICAL NARRATIVE RISK: Multiple life-threatening conditions detected');
  } else if (riskScore >= 15) {
    insights.push('⚠️ HIGH NARRATIVE RISK: Serious medical/trauma conditions present');
  } else if (riskScore >= 8) {
    insights.push('📋 MODERATE NARRATIVE RISK: Medical attention required');
  } else if (riskScore >= 3) {
    insights.push('📋 LOW NARRATIVE RISK: Minor symptoms noted');
  }

  return { riskScore, insights };
}

// Determine risk levels based on scores
function determineRiskLevels(vitals: VitalSigns, rox: number, gcs: number, rpp: number): {
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
    const riskAssessment = determineRiskLevels(vitals, rox_score, gcs_total, rpp_score);

    // Analyze narrative if provided
    const patientNarrative = body.patient_narrative || '';
    const narrativeAnalysis = analyzeNarrative(patientNarrative);

    // Integrate narrative risk with vital signs risk
    let finalRiskLevel = riskAssessment.risk_level;
    if (narrativeAnalysis.riskScore >= 20) {
      // Critical narrative risk can escalate overall risk
      if (finalRiskLevel === 'Low') finalRiskLevel = 'High';
      else if (finalRiskLevel === 'Moderate') finalRiskLevel = 'Critical';
      else if (finalRiskLevel === 'High') finalRiskLevel = 'Critical';
    } else if (narrativeAnalysis.riskScore >= 15) {
      // High narrative risk can escalate overall risk
      if (finalRiskLevel === 'Low') finalRiskLevel = 'Moderate';
      else if (finalRiskLevel === 'Moderate') finalRiskLevel = 'High';
    } else if (narrativeAnalysis.riskScore >= 8) {
      // Moderate narrative risk can escalate from Low to Moderate
      if (finalRiskLevel === 'Low') finalRiskLevel = 'Moderate';
    }

    const result: PredictionResult = {
      rox_score: Math.round(rox_score * 100) / 100, // Round to 2 decimal places
      gcs_total,
      rpp_score,
      respiratory_risk: riskAssessment.respiratory,
      neurological_risk: riskAssessment.neurological,
      cardiovascular_risk: riskAssessment.cardiovascular,
      overall_risk: riskAssessment.overall,
      risk_level: finalRiskLevel,
      narrative_risk_score: narrativeAnalysis.riskScore,
      narrative_insights: narrativeAnalysis.insights,
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