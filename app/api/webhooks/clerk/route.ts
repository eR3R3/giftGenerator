'use server'

import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";
import {createUserType} from "@/constants/types";

export async function POST (req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let event: WebhookEvent

  // Verify payload with headers
  try {
    event = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }
  const {id} = event.data
  const type = event.type

  if(type==="user.created"){
    console.log("trigger user.created")
    const { id, email_addresses, image_url, username } = event.data
    const user: createUserType = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      photo: image_url
    }
    const newUser = await createUser(user)
    return NextResponse.json({message: "created successfully", user: newUser})
  }

  if(type==="user.updated"){
    console.log("trigger user.updated")
    const { id, image_url, first_name} = event.data
    const user = {
      username: first_name!,
      photo: image_url,
      clerkId: id,
    };
    const updatedUser = await updateUser(id, user);
    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  if (type === "user.deleted") {
    console.log("trigger user.deleted")
    const { id } = event.data;
    const deletedUser = await deleteUser(id!);
    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  console.log(`Webhook with and ID of ${id} and type of ${type}`);
  console.log("Webhook body:", body);

  return new Response("completed", { status: 200 });
}




