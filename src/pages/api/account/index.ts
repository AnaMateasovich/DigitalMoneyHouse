import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { authenticatedApiClient, EXTERNAL_API } from "../apiClient";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        return res.status(405).json({ error: "Method not allowed"})
    }

    try {
        console.log('Cookies recibidas: ', req.cookies)
        console.log('SessionId: ', req.cookies.sessionId)

        const profile = await authenticatedApiClient(req, `${EXTERNAL_API}/api/account`, {
            method: 'GET'
        })

        return res.status(200).json(profile)
        
    } catch (error) {
        if (error instanceof ApiError)
        console.error('Error in account', error)
        return res.status(401).json({error: error})
    }
}