"use client";

import { createUser, updateUser, deleteUser } from "@/lib/actions/user.actions";

export default function CreateUserButton() {
    const handleCreateUser = async () => {
        const dummyUserData = {

            photo: "https://example.com/photo.jpgddwd",
            firstName: "Dummy",
            lastName: "User",

        };

        try {
            const response = await deleteUser("dummy_clerk_id_123x");
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
