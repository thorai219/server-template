declare module "express" {
  export interface Request {
    user?: { id: string; email: string; name: string };
  }
}
