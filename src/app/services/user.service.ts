import { NewUserResponse } from "../types/newUserResponse.types"
import { TokenResponse } from "../types/tokenResponse.types"
import { AccountService } from "./account.service"
import { apiClient, BASE_URL } from "./apiClient"
import { User } from "../types/user.type"

export const UserService = {

    async register(newUser: User): Promise<NewUserResponse> {
        return apiClient<NewUserResponse>(`${BASE_URL}/api/users`, {
            method: 'POST',
            body: JSON.stringify(newUser)
        })
    },
    async getUserData(token: TokenResponse): Promise<User> {
        const account = await AccountService.getProfile(token)
        const userId = account.user_id
        return apiClient<User>(`${BASE_URL}/api/users/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: token.token
            },
        })
    },
    async updateUserData(token: TokenResponse, newData: User): Promise<User> {
        const account = await AccountService.getProfile(token)
        const userId = account.user_id
        return apiClient<User>(`${BASE_URL}/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: token.token
            },
            body: JSON.stringify(newData)
        })
    },
}