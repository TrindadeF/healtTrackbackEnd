import * as express from "express";

declare global {
  namespace Express {
    interface user extends Request {
      user?: {
        uid: string;
        email: string;
        role: string;
      };
    }
  }
}
