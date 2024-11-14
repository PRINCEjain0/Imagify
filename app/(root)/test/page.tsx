"use client";

import { deleteUser } from "@/lib/actions/user.actions";

export default function CreateUserButton() {
    const handleCreateUser = async () => {


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
