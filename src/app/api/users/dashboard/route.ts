import { connectToMongoDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Define your Mongoose model for the dashboard collection
const DashboardSchema = new mongoose.Schema({
    type: String,
    value: Number,
    stats: {
        type: Object,
    },
});
const Dashboard = mongoose.models.Dashboard || mongoose.model('Dashboard', DashboardSchema);

// HTTP GET method
export async function GET() {
    await connectToMongoDB(); // Ensure MongoDB connection is established

    try {
        // Fetch the dashboard data
        const dashboardData = await Dashboard.find();

        if (!dashboardData) {
            return new Response(JSON.stringify({ message: 'Dashboard data not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(dashboardData), { status: 200 });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ message: 'Error fetching data', error: error.message }),
            { status: 500 }
        );
    }
}

// HTTP POST method
export async function POST(req: Request) {
    await connectToMongoDB(); // Ensure MongoDB connection is established

    try {
        const { type, value, change } = await req.json();

        if (!type || value === undefined || change === undefined) {
            return new Response(
                JSON.stringify({ message: 'Invalid request body. Please provide type, value, and change.' }),
                { status: 400 }
            );
        }

        // Update the specific field in the dashboard collection
        const updateResult = await Dashboard.updateOne(
            {},
            {
                $set: {
                    [type]: value,
                    [`stats.${type}Change`]: change,
                },
            },
            { upsert: true } // Create the document if it doesn't exist
        );

        if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
            return new Response(JSON.stringify({ message: 'No changes were made.' }), { status: 400 });
        }

        return new Response(JSON.stringify({ message: 'Data updated successfully' }), { status: 200 });
    } catch (error: any) {
        return new Response(
            JSON.stringify({ message: 'Error updating data', error: error.message }),
            { status: 500 }
        );
    }
}
