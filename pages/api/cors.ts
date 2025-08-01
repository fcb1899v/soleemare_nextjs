/**
 * pages/api/cors.ts
 * 
 * CORS middleware utility
 * 
 * Features:
 * - CORS configuration for API routes
 * - Middleware execution wrapper
 * - Support for multiple HTTP methods
 * - Error handling for middleware execution
 * 
 * Dependencies:
 * - Next.js API types (NextApiRequest, NextApiResponse)
 * - CORS library for cross-origin requests
 */

import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

// CORS configuration with allowed methods
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

/**
 * Executes middleware with promise-based error handling
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 * @param fn - Middleware function to execute
 * @returns Promise that resolves or rejects based on middleware result
 */
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

/**
 * Applies CORS middleware to API requests
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 * @param next - Next function to call after middleware
 */
export default async function applyCorsMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  await runMiddleware(req, res, cors);
  next();
}


