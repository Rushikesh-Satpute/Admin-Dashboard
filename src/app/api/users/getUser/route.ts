// src/app/api/users/getUser/route.ts

import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/userModel';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return new Response(JSON.stringify({ error: 'userId is required' }), { status: 400 });
    }

    try {
        // Connect to MongoDB
        await connectToMongoDB();

        // Find the user in the database using the userId
        const user = await User.findById(userId);

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Return the user data in the response
        return new Response(
            JSON.stringify({
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                mobile: user.mobile,
                bio: user.bio,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
    }
}
