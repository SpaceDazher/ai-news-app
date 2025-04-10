// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromHeader, verifyToken } from './lib/auth';

// Define allowed origins
const allowedOrigins = [
  process.env.NODE_ENV === 'production'
    ? (process.env.FRONTEND_URL || 'https://your-production-domain.com') // Placeholder
    : 'http://localhost:5173', // Development frontend
];

// CORS headers to apply
const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400', // 24 hours cache
};

// Helper function to apply CORS headers
function applyCorsHeaders(response: NextResponse, origin: string) {
  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return true;
  }
  return false;
}

// Define public paths that don't require authentication
const publicPaths = [
  '/api/auth/login',
  '/api/auth/register',
  // '/api/db-status', // Add if you have a health check endpoint
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const origin = request.headers.get('origin') || '';

  // Log the request for debugging
  console.log(`[Middleware] ${request.method} ${path} from ${origin}`);

  // Handle OPTIONS requests for CORS preflight
  if (request.method === 'OPTIONS') {
    console.log(`[CORS] Handling OPTIONS preflight for ${path}`);
    const headers = new Headers();
    if (allowedOrigins.includes(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
      Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
    }
    return new NextResponse(null, { status: 204, headers });
  }

  // Check if the path is public (doesn't require auth)
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

  // Clone request headers for potential modification
  const requestHeaders = new Headers(request.headers);

  // For protected paths, verify JWT
  if (!isPublicPath) {
    // Get authorization header and extract token
    const authHeader = request.headers.get('Authorization');
    console.log(`[Auth] Authorization header for ${path}: ${authHeader ? 'Present' : 'Missing'}`);

    const token = getTokenFromHeader(authHeader ?? undefined);

    // If no token is provided for protected route
    if (!token) {
      console.warn(`[Auth] No token found for protected route ${path}`);
      const response = NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
      applyCorsHeaders(response, origin); // Apply CORS to error response
      return response;
    }

    // Verify the token
    try {
      // Use await as verifyToken is now async
      const decoded = await verifyToken(token);
      const userId = decoded.userId; // userId is now accessible

      if (!userId) {
        throw new Error('Invalid token payload');
      }

      // Add user info to headers for API routes
      requestHeaders.set('x-user-id', userId);
      console.log(`[Auth] Token verified for user ${userId} on path ${path}`);
    } catch (error) {
      // Handle different token errors
      console.error(`[Auth] Token verification failed for ${path}:`, error);
      let errorMessage = 'Invalid token';
      const status = 401; // Use const as status is not reassigned here
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError') {
          errorMessage = 'Token expired';
        } else if (error.name === 'JsonWebTokenError') {
          errorMessage = 'Invalid token format';
        }
      }
      const response = NextResponse.json(
        { error: errorMessage },
        { status }
      );
      applyCorsHeaders(response, origin); // Apply CORS to error response
      return response;
    }
  } else {
     console.log(`[Auth] Public path ${path}, skipping JWT check.`);
  }

  // Process the request - either public path or authenticated
  const response = NextResponse.next({
    request: {
      headers: requestHeaders, // Pass modified headers (potentially with x-user-id)
    },
  });

  // Apply CORS headers to all final responses
  applyCorsHeaders(response, origin);

  return response;
}

// Apply this middleware only to API routes
export const config = {
  matcher: [
    '/api/:path*',
    '/auth/:path*',
  ], // Apply to all API routes and auth routes
};
