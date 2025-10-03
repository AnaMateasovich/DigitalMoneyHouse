import { NextApiRequest } from "next"
import { Account } from "../types/account.types"
import { AliasRequest } from "../types/alias.types"
import { TokenResponse } from "../types/tokenResponse.types"
import { authenticatedApiClient, EXTERNAL_API } from "../../pages/api/apiClient"

export const AccountService = {
    // async getProfile(req: NextApiRequest): Promise<Account> {
    //     return authenticatedApiClient<Account>(req, `${EXTERNAL_API}/api/account`, {
    //         method: 'GET'
    //     })
    // },

    async updateAlias(req: NextApiRequest, newAlias: AliasRequest): Promise<Account> {
        
        return authenticatedApiClient<Account>(req, `${EXTERNAL_API}/api/accounts/${accountId}`, {
            method: 'PATCH',
            headers: {
                Authorization: token.token
            },
            body:
                JSON.stringify(newAlias),
        })
    },

}