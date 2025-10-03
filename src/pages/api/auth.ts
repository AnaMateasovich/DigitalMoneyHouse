// import client from "@/app/lib/redis";
// import { NextApiRequest } from "next";
// import { cookies } from "next/headers";

// export async function getJwtFromCookies():Promise<string> {
//     const cookieStore = cookies()
//     const sessionId = (await cookieStore).get('sessionId')?.value

//     if (!sessionId) {
//         throw new Error("Unauthorized")
//     }
//     const jwt = await client.get(`session:${sessionId}`)

//     if (!jwt) {
//         throw new Error("Session expired");
//     }

//     return jwt
// }