import { Card } from "../types/card.types";
import { CardRequest } from "../types/cardRequest.types";
import { TokenResponse } from "../types/tokenResponse.types";
import { AccountService } from "./account.service";
import { apiClient, BASE_URL } from "../../pages/api/apiClient";

export const CardsService = {

    async getCards(token: TokenResponse): Promise<Card[]> {
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient(`${BASE_URL}/api/accounts/${accountId}/cards`, {
            method: 'GET',
            headers: {
                Authorization: token.token
            }
        })
    },
    async createCard(token: TokenResponse, card: CardRequest): Promise<Card> {
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient(`${BASE_URL}/api/accounts/${accountId}/cards`, {
            method: 'POST',
            headers: {
                Authorization: token.token
            },
            body: JSON.stringify(card)
        })
    },
    async getCardById(token: TokenResponse, cardId: number): Promise<Card> {
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient(`${BASE_URL}/api/accounts/${accountId}/cards/${cardId}`, {
            method: 'GET',
            headers: {
                Authorization: token.token
            }
        })
    },
    async deleteCardById(token: TokenResponse, cardId: number): Promise<Card> {
        const account = await AccountService.getProfile(token)
        const accountId = account.id
        return apiClient(`${BASE_URL}/api/accounts/${accountId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                Authorization: token.token
            }
        })
    },
}