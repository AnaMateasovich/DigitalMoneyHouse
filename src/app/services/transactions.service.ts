import { TokenResponse } from "../types/tokenResponse.types";
import { Transaction } from "../types/transaction.types";
import { TransactionRequest } from "../types/transactionRequest.types";
import { TransferenceRequest } from "../types/transferenceRequest.types";
import { AccountService } from "./account.service";
import { apiClient, BASE_URL } from "../../pages/api/apiClient";

export const TransactionsService = {

    async getActivity(token: TokenResponse):Promise<Transaction[]> {
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient<Transaction[]>(`${BASE_URL}/api/accounts/${accountId}/activity`, {
                    method: 'GET',
                    headers: {
                        Authorization: token.token
                    }
                })
    },

    async createTransaction(transaction: TransactionRequest, token: TokenResponse):Promise<Transaction>{
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient<Transaction>(`${BASE_URL}/api/accounts/${accountId}/transactions`, {
                    method: 'POST',
                    headers: {
                        Authorization: token.token
                    },
                    body: JSON.stringify(transaction)
                })
    },

     async getTransactionById(token: TokenResponse, transactionId: number):Promise<Transaction>{
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient<Transaction>(`${BASE_URL}/api/accounts/${accountId}/transactions/${transactionId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: token.token
                    }
                })
    },
    
}