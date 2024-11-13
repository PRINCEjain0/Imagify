"use client";

import { createUser } from "@/lib/actions/user.actions";

export default function CreateUserButton() {
    const handleCreateUser = async () => {
        const dummyUserData = {
            clerkId: "dummy_clerk_id_123",
            email: "dummyuser@example.com",
            photo: "https://example.com/photo.jpg",
            firstName: "Dummy",
            lastName: "User",
            planId: 1,
            creditBalance: 1
        };

        try {
            const response = await createUser(dummyUserData);
            if (response.error) {
                console.error(response.error);
            } else {
                console.log(response.message);
            }
        } catch (error) {
            console.error("Error calling createUser:", error);
        }
    };

    return (
        <button onClick={handleCreateUser}>
            Create Dummy User
        </button>
    );
}
