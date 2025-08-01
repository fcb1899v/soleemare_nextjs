/**
 * pages/api/hello.ts
 * 
 * Hello API endpoint
 * 
 * Features:
 * - Simple API endpoint for testing
 * - CORS middleware integration
 * - JSON response with greeting message
 * - Middleware execution wrapper
 * 
 * Dependencies:
 * - Next.js API types (NextApiRequest, NextApiResponse)
 * - CORS library for cross-origin requests
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// CORS configuration for this endpoint
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

/**
 * Executes middleware with promise-based error handling
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 * @param fn - Middleware function to execute
 * @returns Promise that resolves or rejects based on middleware result
 */
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

/**
 * Hello API handler
 * Returns a greeting message with CORS support
 * @param req - Next.js API request object
 * @param res - Next.js API response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Apply CORS middleware
  await runMiddleware(req, res, cors)

  // Return greeting message
  res.json({ message: 'Hello Everyone!' })
}