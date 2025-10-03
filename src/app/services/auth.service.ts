import { NewUserResponse } from "../types/newUserResponse.types";
import { TokenRequest } from "../types/tokenRequest.types";
import { TokenResponse } from "../types/tokenResponse.types";
import {  authenticatedApiClient, EXTERNAL_URL} from "../../pages/api/apiClient";
import { NextApiRequest } from "next";

export const AuthService = {

    async login(credentials: TokenRequest): Promise<TokenResponse> {
        return authenticatedApiClient<TokenResponse>(`${EXTERNAL_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        })

    },


}
