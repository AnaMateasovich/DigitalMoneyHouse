import { Account } from "../types/account.types"
import { AliasRequest } from "../types/alias.types"
import { authenticatedApiClient, EXTERNAL_API } from "./apiClient"

export const AccountService = {
    async getProfile(): Promise<Account> {
        return authenticatedApiClient<Account>(`${EXTERNAL_API}/api/account`, {
            method: 'GET'
        })
    },

    async updateAlias(newAlias: AliasRequest): Promise<Account> {
        const account = await AccountService.getProfile()
        return authenticatedApiClient<Account>( `${EXTERNAL_API}/api/accounts/${account.id}`, {
            method: 'PATCH',
            body:
                JSON.stringify(newAlias),
        })
    },

}