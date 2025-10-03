import { TokenRequest } from "../types/tokenRequest.types";
import { TokenResponse } from "../types/tokenResponse.types";
import { authenticatedApiClient, EXTERNAL_API } from "./apiClient";

export const AuthService = {

    async login(credentials: TokenRequest): Promise<TokenResponse> {
        return authenticatedApiClient<TokenResponse>(`${EXTERNAL_API}/api/login`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        })

    },


}
