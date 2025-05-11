import "express";

declare module "express" {
  interface Request {
    user?: { id: string; email: string; name: string };
    tenantId?: string;
  }
}
