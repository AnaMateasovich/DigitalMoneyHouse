import { TokenResponse } from "../types/tokenResponse.types";
import { Transaction } from "../types/transaction.types";
import { TransferenceRequest } from "../types/transferenceRequest.types";
import { AccountService } from "./account.service";
import { apiClient, BASE_URL } from "./apiClient";

export const TranferencesService = {

    async createDeposit(token: TokenResponse, deposit: TransferenceRequest): Promise<Transaction> {
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient(`${BASE_URL}/api/accounts/${accountId}/deposits`, {
            method: "POST",
            headers: {
                Authorization: token.token
            },
            body: JSON.stringify(deposit)
        }) 
    },
    async getTransferences(token: TokenResponse, transference: Transaction[]): Promise<Transaction> {
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient(`${BASE_URL}/api/accounts/${accountId}/transferences`, {
            method: "GET",
            headers: {
                Authorization: token.token
            },
        }) 
    },
    async createTransference(token: TokenResponse, transference: TransferenceRequest): Promise<Transaction> {
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient(`${BASE_URL}/api/accounts/${accountId}/transferences`, {
            method: "POST",
            headers: {
                Authorization: token.token
            },
            body: JSON.stringify(transference)
        }) 
    },
}