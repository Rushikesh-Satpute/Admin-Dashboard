
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';
import { connectToMongoDB } from '@/lib/mongodb';

connectToMongoDB();

export async function GET(req: NextRequest) {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        // Verify the JWT token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not set in environment variables');
        }

        let decodedToken: any;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
        }

        // Retrieve user data from the database using the decoded token's ID
        const user = await User.findById(decodedToken.id).select('-password'); // Exclude the password field
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Respond with user data
        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        console.error('Error in GET /api/users/me:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
