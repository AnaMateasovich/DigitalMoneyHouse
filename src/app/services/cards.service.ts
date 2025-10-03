import { Card } from "../types/card.types";
import { CardRequest } from "../types/cardRequest.types";
import { AccountService } from "./account.service";
import { authenticatedApiClient, EXTERNAL_API } from "./apiClient";

export const CardsService = {

    async getCards(): Promise<Card[]> {
        const account = await AccountService.getProfile()
        return authenticatedApiClient(`${EXTERNAL_API}/api/accounts/${account.id}/cards`, {
            method: 'GET',
        })
    },
    async createCard(card: CardRequest): Promise<Card> {
        const account = await AccountService.getProfile()
        return authenticatedApiClient(`${EXTERNAL_API}/api/accounts/${account.id}/cards`, {
            method: 'POST',
            body: JSON.stringify(card)
        })
    },
    async getById(id: string): Promise<Card> {
        const account = await AccountService.getProfile()
        return authenticatedApiClient(`${EXTERNAL_API}/api/accounts/${account.id}/cards/${id}`, {
            method: 'GET',
        })
    },
    async deleteById(id: string): Promise<Card> {
        const account = await AccountService.getProfile()
        return authenticatedApiClient(`${EXTERNAL_API}/api/accounts/${account.id}/cards/${id}`, {
            method: 'DELETE',
        })
    },
}