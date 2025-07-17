import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectToMongoDB();

export async function POST(request: NextRequest) {
    try {
        // 1- Parse and destructure the request body
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log('Request Body:', reqBody);

        // 2- Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User does not exist in DB' }, { status: 400 });
        }

        // 3- Validate the password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        // 4- Prepare token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // 4.1- Generate JWT
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not set');
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '2d' });

        // 4.2- Send token and userId as cookies
        const isProduction = process.env.NODE_ENV === 'production';
        const response = NextResponse.json({
            message: 'Login Successful',
            success: true,
        });

        // Set the JWT token as a cookie
        response.cookies.set('token', token, {
            httpOnly: false,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60, // 2 days in seconds
        });

        // Set the userId as a cookie
        response.cookies.set('userId', user._id.toString(), {
            httpOnly: false,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 2 * 24 * 60 * 60, // 2 days in seconds
        });

        return response;
    } catch (error: any) {
        console.error('Error in POST /api/users/login:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}