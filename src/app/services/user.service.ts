import { NewUserResponse } from "../types/newUserResponse.types"
import { TokenResponse } from "../types/tokenResponse.types"
import { AccountService } from "./account.service"
import { authenticatedApiClient, EXTERNAL_API, externalApi } from "./apiClient"
import { User } from "../types/user.type"

export const UserService = {

    async register(newUser: User): Promise<NewUserResponse> {
        return externalApi<NewUserResponse>(`${EXTERNAL_API}/api/users`, {
            method: 'POST',
            body: JSON.stringify(newUser)
        })
    },
    async getUserData(id: string): Promise<User> {
        const account = await AccountService.getProfile()
        if (account.user_id.toString() !== id) {
            throw new Error('Unauthorized: Cannot access other user data')
        }
        return authenticatedApiClient<User>(`${EXTERNAL_API}/api/users/${account.user_id}`, {
            method: 'GET',
        })
    },
    async updateUserData(newData: User, id: string): Promise<User> {
        const account = await AccountService.getProfile()
        if (account.user_id.toString() !== id) {
            throw new Error('Unauthorized: Cannot access other user data')
        }
        return authenticatedApiClient<User>(`${EXTERNAL_API}/api/users/${account.user_id}`, {
            method: 'PATCH',
            body: JSON.stringify(newData)
        })
    },
}