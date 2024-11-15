import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from "next/server"
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions"

interface CreateUserParams {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
    photo: string;
}

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status: 400,
        })
    }

    const { id } = evt.data
    const eventType = evt.type

    // CREATE
    if (eventType === "user.created") {
        console.log(evt)
        const { id, email_addresses, image_url, first_name, last_name } = evt.data;
        console.log("working")
        const user: CreateUserParams = {
            clerkId: id,
            email: email_addresses[0].email_address,
            firstName: first_name || '',
            lastName: last_name || '',
            photo: image_url || '',
        };
        console.log(user)
        const newUser = await createUser(user);

        // Update Clerk metadata using the correct client syntax
        // if (newUser) {
        //     await clerkClient.users.updateMetadata(id, {
        //         publicMetadata: {
        //             userId: newUser._id,
        //         },
        //     });
        // }

        return NextResponse.json({ message: "OK", user: newUser });
    }

    // UPDATE
    if (eventType === "user.updated") {
        const { id, image_url, first_name, last_name } = evt.data;

        const user = {
            firstName: first_name || '',
            lastName: last_name || '',
            photo: image_url || '',
        };

        const updatedUser = await updateUser(id, user);

        return NextResponse.json({ message: "OK", user: updatedUser });
    }

    // DELETE
    if (eventType === "user.deleted") {
        const { id } = evt.data;
        console.log(`Processing user.deleted event for Clerk ID: ${id}`);

        if (!id) {
            console.error("User ID is undefined for user.deleted event");
            return new Response("User ID is missing", { status: 400 });
        }
        try {
            const deletedUser = await deleteUser(id);
            console.log(`User deleted successfully: ${JSON.stringify(deletedUser)}`);
            return NextResponse.json({ message: "OK", user: deletedUser });
        } catch (error) {
            console.error(`Error deleting user with Clerk ID ${id}:`, error);
            return new Response('Error deleting user', { status: 500 });
        }
    }

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)

    return new Response('', { status: 200 })
}