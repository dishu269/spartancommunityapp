// Basic structure for the login endpoint
// Handles POST requests

// Import bcryptjs
import bcryptjs from 'bcryptjs';

// Import Prisma client
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
      // Connect to the Prisma client - Prisma typically manages connections automatically,
      // so explicit connect/disconnect might not be needed for every request.
      // However, it's good practice to ensure it's available.
      // await prisma.$connect(); // Usually not needed per-request

      // Query the database for a user by email
      const user = await prisma.user.findUnique({ where: { email } });

      // Use bcryptjs.compare() to verify the password
      if (user && await bcryptjs.compare(password, user.password)) {
        // Login successful
        // TODO: Implement session management or token generation here
        return res.status(200).json({ success: true, message: 'Login successful', userId: user.id });
      } else {
        // Invalid credentials
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
      // Disconnect from the Prisma client - Prisma typically manages connections automatically.
      // Explicit disconnect might be part of a graceful shutdown strategy for the app, not per-request.
      // await prisma.$disconnect(); // Usually not needed per-request
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
