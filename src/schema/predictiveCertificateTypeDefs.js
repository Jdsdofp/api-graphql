// src/schema/predictiveCertificateTypeDefs.ts
import { gql } from "graphql-tag";
export const predictiveCertificateTypeDefs = gql `
  type PredictiveCertificate {
    id: ID
    company_id: Int
    company_name: String
    certificate_id: Int
    app_certificate_id: Int
    certificate_code: String
    certificate_type: String
    certificate_description: String
    certificate_status_id: Int
    certificate_status_name: String
    item_id: Int
    Obj_item_id: Int
    item_code: String
    item_name: String
    item_type: String
    active_item: Boolean
    issue_date: String
    expiration_date: String
    created_date: String
    request_date: String
    modified_date: String
    issue_date_ms: Float
    expiration_date_ms: Float
    created_date_ms: Float
    days_since_issue: Int
    days_until_expiration: Int
    hours_until_expiration: Float
    validity_status: String
    validity_duration_days: Int
    certificate_duration_category: String
    certificate_age_ratio: Float
    certificate_pattern_fingerprint: String
    recertification_probability: Float
    issuer_relationship_strength: Float
    certificate_holder_type: String
    renewal_workload_weight: Float
    temporal_trend_component: Float
    data_completeness_score: Float
    renewal_window: String
    certificate_complexity_score: Float
    asset_value_at_risk: Float
    asset_cost_category: String
    strategic_importance: String
    automation_readiness_score: Float
    peer_comparison_group: String
    anomaly_detection_score: Float
    renewal_urgency_level: Float
    days_to_optimal_renewal: Int
    renewal_probability_score: Float
    expiration_risk_score: Float
    compliance_score: Float
    operational_impact_score: Float
    financial_risk_value: Float
    combined_risk_score: Float
    risk_trend: String
    historical_renewal_pattern: String
    renewal_frequency_category: String
    pattern_confidence_score: Float
    issuer_company_code: String
    issuer_company_name: String
    issuer_reliability_score: Float
    issuer_response_rate: Float
    issuer_relationship_years: Float
    concurrent_renewals_same_period: Int
    department_workload_index: Float
    cost_center_workload_index: Float
    resource_availability_score: Float
    recommended_start_date: String
    recommended_start_date_ms: Float
    days_until_recommended_start: Int
    anomaly_detected: Boolean
    anomaly_type: String
    anomaly_severity: String
    trend_direction: String
    seasonality_factor: Float
    forecast_confidence: Float
    similar_certificates_count: Int
    automation_candidate: Boolean
    regulatory_deadline: String
    regulatory_deadline_ms: Float
    days_until_regulatory_deadline: Int
    asset_criticality: String
    department_code: String
    department_name: String
    cost_center_code: String
    cost_center_name: String
    prediction_reliability: Float
    ai_recommendation: String
    recommended_action: String
    action_priority: Int
    needs_immediate_action: Boolean
    in_optimal_renewal_window: Boolean
    has_renewal_plan: Boolean
    is_high_value_asset: Boolean
    is_critical_compliance: Boolean
    purchase_cost: Float
    purchase_currency: String
    brand: String
    model: String
    serial: String
    custody_code: String
    custody_name: String
    custody_email: String
    custody_phone: String
    Home_site_code: String
    Home_site_name: String
    Home_Area: String
    Home_Area_city: String
    Home_Area_State: String
    Home_Area_country: String
    category_code: String
    category_name: String
    is_expiring_this_week: Boolean
    is_expiring_90_days: Boolean
    is_expired: Boolean
    is_expiring_soon: Boolean
    notes: String
    external_url: String
    created_by: String
    modified_by: String
    prediction_date: String
    prediction_date_ms: Float
    prediction_date_unix: Float
    last_updated: String
    last_updated_ms: Float
    created_at: String
    created_at_ms: Float
  }

  type CertificateMetrics {
    total: Int
    expired: Int
    approved: Int
    expiring_90_days: Int
    expiring_soon: Int
    high_risk: Int
    medium_risk: Int
    low_risk: Int
    total_financial_risk: Float
    avg_renewal_probability: Float
  }

  type DepartmentStats {
    name: String
    count: Int
    expired: Int
  }

  type CertificateTypeStats {
    name: String
    count: Int
    expired: Int
  }

  type MonthlyExpiration {
    month: Int
    expired: Int
    expiring_0_30: Int
    expiring_31_90: Int
    valid: Int
  }

  type ExpirationRanges {
    under_minus_200: Int
    minus_200_to_minus_100: Int
    minus_100_to_minus_50: Int
    minus_50_to_0: Int
    zero_to_50: Int
    range_50_to_100: Int
    over_100: Int
  }

  type Query {
    predictiveCertificates: [PredictiveCertificate]
    certificateMetrics: CertificateMetrics
    certificatesByDepartment: [DepartmentStats]
    certificatesByType: [CertificateTypeStats]
    certificateExpirationByMonth: [MonthlyExpiration]
    certificateExpirationRanges: ExpirationRanges
  }
`;
//# sourceMappingURL=predictiveCertificateTypeDefs.js.map