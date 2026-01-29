import { TokenResponse } from "../types/tokenResponse.types";
import { Transaction } from "../types/transaction.types";
import { TransactionRequest } from "../types/transactionRequest.types";
import { AccountService } from "./account.service";
import { authenticatedApiClient, EXTERNAL_API } from "./apiClient";

export const TransactionsService = {

    async getActivity():Promise<Transaction[]> {
        const account = await AccountService.getProfile()
        return authenticatedApiClient<Transaction[]>(`${EXTERNAL_API}/api/accounts/${account.id}/activity`, {
                    method: 'GET',
                })
    },

    async createTransaction(transaction: TransactionRequest):Promise<Transaction>{
        const account = await AccountService.getProfile()
        return authenticatedApiClient<Transaction>(`${EXTERNAL_API}/api/accounts/${account.id}/transactions`, {
                    method: 'POST',
                    body: JSON.stringify(transaction)
                })
    },

     async getById(id: string):Promise<Transaction | null>{
        const account = await AccountService.getProfile()
        return authenticatedApiClient<Transaction>(`${EXTERNAL_API}/api/accounts/${account.id}/transactions/${id}`, {
                    method: 'GET',
                })
    },
    
    
}