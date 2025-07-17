import { connectToMongoDB } from '@/lib/mongodb';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connectToMongoDB();

export async function PUT(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { userId, name, email, bio, mobile, role } = reqBody;

        // Validation: Check if the userId is provided
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json(
                { error: 'Invalid or missing user ID' },
                { status: 400 }
            );
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Advanced validations for fields
        if (name && (typeof name !== 'string' || name.trim().length < 2)) {
            return NextResponse.json(
                { error: 'Name must be at least 2 characters long' },
                { status: 400 }
            );
        }

        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { error: 'Invalid email format' },
                    { status: 400 }
                );
            }

            // Check if the new email is already taken by another user
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== userId) {
                return NextResponse.json(
                    { error: 'Email is already in use by another user' },
                    { status: 400 }
                );
            }
        }

        if (mobile) {
            const mobileRegex = /^[6-9]\d{9}$/;
            if (!mobileRegex.test(mobile)) {
                return NextResponse.json(
                    { error: 'Invalid mobile number format' },
                    { status: 400 }
                );
            }
        }

        if (role && (typeof role !== 'string')) {
            return NextResponse.json(
                { error: 'Invalid role.' },
                { status: 400 }
            );
        }

        // if (role && (typeof role !== 'string' || !['CEO | @Linksus', 'user'].includes(role.toLowerCase()))) {
        //     return NextResponse.json(
        //         { error: 'Invalid role. Role must be either "admin" or "user"' },
        //         { status: 400 }
        //     );
        // }

        if (bio && typeof bio !== 'string') {
            return NextResponse.json(
                { error: 'Bio must be a string' },
                { status: 400 }
            );
        }

        // Update the user fields only if new values are provided
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (role) user.role = role;
        if (mobile) user.mobile = mobile;
        if (email) user.email = email;

        // Save the updated user

        const updatedUser = await user.save();
        return NextResponse.json({
            message: 'Profile updated successfully',
            success: true,
            updatedUser: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                bio: updatedUser.bio,
                mobile: updatedUser.mobile,
                role: updatedUser.role,
            },
        });

    } catch (error: any) {
        console.error(error.data);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}