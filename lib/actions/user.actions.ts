import { handleError } from "../utils";
import { revalidatePath } from 'next/cache'
import connectToDatabase from "../database/mongoose";
import User from "../database/models/user.model";

//CREATE

export async function createUser(user: CreateUserParams) {


    try {
        await connectToDatabase;

        const newUser = User.create(user);

        return JSON.parse(JSON.stringify(newUser));

    } catch (error) {
        handleError(error);
    }

}

//READ

export async function readUser(clerkId: String) {
    try {
        await connectToDatabase;

        const user = User.findOne({ clerkId });
        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        });

        if (!updatedUser) throw new Error("User update failed");

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

//DELETE
export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();


        // Delete user
        const deletedUser = await User.findByIdAndDelete({ clerkId });
        if (!deletedUser) {
            throw new Error("User not found");
        }
        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
    try {
        await connectToDatabase();

        const updatedUserCredits = await User.findOneAndUpdate(
            { _id: userId },
            { $inc: { creditBalance: creditFee } },
            { new: true }
        )

        if (!updatedUserCredits) throw new Error("User credits update failed");

        return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
        handleError(error);
    }
}

