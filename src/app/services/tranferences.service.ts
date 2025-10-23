import { Transaction } from "../types/transaction.types";
import { TransferenceRequest } from "../types/transferenceRequest.types";
import { AccountService } from "./account.service";
import { authenticatedApiClient, EXTERNAL_API } from "./apiClient";

export const TranferencesService = {

    async createDeposit(deposit: TransferenceRequest, id: string): Promise<Transaction> {
        return authenticatedApiClient(`${EXTERNAL_API}/api/accounts/${id}/deposits`, {
            method: "POST",
        
            body: JSON.stringify(deposit)
        }) 
    },
    async getTransferences(): Promise<Transaction[]> {
        const account = await AccountService.getProfile()
        return authenticatedApiClient(`${EXTERNAL_API}/api/accounts/${account.id}/transferences`, {
            method: "GET",
        
        }) 
    },
    async createTransference( transference: TransferenceRequest): Promise<Transaction> {
        const account = await AccountService.getProfile()
        return authenticatedApiClient(`${EXTERNAL_API}/api/accounts/${account.id}/transferences`, {
            method: "POST",

            body: JSON.stringify(transference)
        }) 
    },
}