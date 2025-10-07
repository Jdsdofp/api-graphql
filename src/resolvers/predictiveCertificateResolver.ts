// src/resolvers/predictiveCertificateResolvers.ts
import { db } from "../db.js";

export const predictiveCertificateResolvers = {
  Query: {
    // predictiveCertificates: async () => {
    //   const [rows] = await db.query(
    //     "SELECT * FROM mat_view_prod.predictive_certificate_analysis"
    //   );
    //   return rows;
    // },
     predictiveCertificates: async (_: any, __: any, { db, empresa_id }: any) => {
      const [rows] = await db.query(
        'SELECT * FROM mat_view_prod.predictive_certificate_analysis WHERE company_id = ?',
        [empresa_id]
      );
      return rows;
    },
    
    certificateMetrics: async () => {
      const [rows] = await db.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN certificate_status_name = 'EXPIRED' THEN 1 ELSE 0 END) as expired,
          SUM(CASE WHEN certificate_status_name = 'APPROVED' THEN 1 ELSE 0 END) as approved,
          SUM(CASE WHEN is_expiring_90_days = true THEN 1 ELSE 0 END) as expiring_90_days,
          SUM(CASE WHEN is_expiring_soon = true THEN 1 ELSE 0 END) as expiring_soon,
          SUM(CASE WHEN combined_risk_score >= 60 THEN 1 ELSE 0 END) as high_risk,
          SUM(CASE WHEN combined_risk_score >= 30 AND combined_risk_score < 60 THEN 1 ELSE 0 END) as medium_risk,
          SUM(CASE WHEN combined_risk_score < 30 THEN 1 ELSE 0 END) as low_risk,
          SUM(COALESCE(financial_risk_value, 0)) as total_financial_risk,
          AVG(renewal_probability_score) as avg_renewal_probability
        FROM mat_view_prod.predictive_certificate_analysis
      `);
      return rows[0];
    },
    
    certificatesByDepartment: async () => {
      const [rows] = await db.query(`
        SELECT 
          COALESCE(department_name, 'Unknown') as name,
          COUNT(*) as count,
          SUM(CASE WHEN certificate_status_name = 'EXPIRED' THEN 1 ELSE 0 END) as expired
        FROM mat_view_prod.predictive_certificate_analysis
        GROUP BY department_name
        ORDER BY count DESC
        LIMIT 10
      `);
      return rows;
    },
    
    certificatesByType: async () => {
      const [rows] = await db.query(`
        SELECT 
          COALESCE(certificate_type, 'Unknown') as name,
          COUNT(*) as count,
          SUM(CASE WHEN certificate_status_name = 'EXPIRED' THEN 1 ELSE 0 END) as expired
        FROM mat_view_prod.predictive_certificate_analysis
        GROUP BY certificate_type
        ORDER BY count DESC
        LIMIT 10
      `);
      return rows;
    },
    
    certificateExpirationByMonth: async () => {
      const [rows] = await db.query(`
        SELECT 
          MONTH(FROM_UNIXTIME(expiration_date_ms/1000)) as month,
          SUM(CASE WHEN certificate_status_name = 'EXPIRED' THEN 1 ELSE 0 END) as expired,
          SUM(CASE WHEN days_until_expiration BETWEEN 0 AND 30 THEN 1 ELSE 0 END) as expiring_0_30,
          SUM(CASE WHEN days_until_expiration BETWEEN 31 AND 90 THEN 1 ELSE 0 END) as expiring_31_90,
          SUM(CASE WHEN days_until_expiration > 90 THEN 1 ELSE 0 END) as valid
        FROM mat_view_prod.predictive_certificate_analysis
        WHERE expiration_date_ms IS NOT NULL
        GROUP BY month
        ORDER BY month
      `);
      return rows;
    },
    
    certificateExpirationRanges: async () => {
      const [rows] = await db.query(`
        SELECT 
          SUM(CASE WHEN days_until_expiration < -200 THEN 1 ELSE 0 END) as under_minus_200,
          SUM(CASE WHEN days_until_expiration BETWEEN -200 AND -101 THEN 1 ELSE 0 END) as minus_200_to_minus_100,
          SUM(CASE WHEN days_until_expiration BETWEEN -100 AND -51 THEN 1 ELSE 0 END) as minus_100_to_minus_50,
          SUM(CASE WHEN days_until_expiration BETWEEN -50 AND -1 THEN 1 ELSE 0 END) as minus_50_to_0,
          SUM(CASE WHEN days_until_expiration BETWEEN 0 AND 49 THEN 1 ELSE 0 END) as zero_to_50,
          SUM(CASE WHEN days_until_expiration BETWEEN 50 AND 99 THEN 1 ELSE 0 END) as range_50_to_100,
          SUM(CASE WHEN days_until_expiration >= 100 THEN 1 ELSE 0 END) as over_100
        FROM mat_view_prod.predictive_certificate_analysis
      `);
      return rows[0];
    },
  },
};