export declare const predictiveCertificateResolvers: {
    Query: {
        predictiveCertificates: (_: any, __: any, { db, empresa_id }: any) => Promise<any>;
        certificateMetrics: () => Promise<any>;
        certificatesByDepartment: () => Promise<import("mysql2").QueryResult>;
        certificatesByType: () => Promise<import("mysql2").QueryResult>;
        certificateExpirationByMonth: () => Promise<import("mysql2").QueryResult>;
        certificateExpirationRanges: () => Promise<any>;
    };
};
//# sourceMappingURL=predictiveCertificateResolver.d.ts.map