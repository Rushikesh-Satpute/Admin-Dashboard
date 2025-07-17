interface Activity {
    id: number;
    action: string;
    date: string;
}

export type User = {
    id: number;
    name: string;
    email: string;
    bio: string;
    mobile: string;
    role: string;
    isActive: boolean;
    avatar: string;
    dob?: Date;
    createdAt?: Date;
    tasks?: number;
    tasksCompleted?: number,
    tasksPending?: number,
    activity?: Activity[];
    taskStats?: object;
};



