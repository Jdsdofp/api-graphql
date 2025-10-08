// src/types/context.ts

import type { Pool } from "mysql2/promise";


export interface GraphQLContext {
  db: Pool;
  empresa_id: string;
  user?: string;
}
