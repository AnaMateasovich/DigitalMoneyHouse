// import { Service } from "../types/service.types";
// import { TokenResponse } from "../types/tokenResponse.types";
// import { AccountService } from "./account.service";
// import { apiClient, BASE_URL } from "./apiClient";

// export const ServicesService = {

//     async getAllServices(): Promise<Service[]> {
//         return apiClient<Service[]>(`${BASE_URL}/api/service`, {
//             method: "GET",
//         })
//     },
//     async getServiceById(token: TokenResponse): Promise<Service> {
//         const account = await AccountService.getProfile(token)
//         const userId = account.user_id
//         return apiClient<Service>(`${BASE_URL}/api/service`, {
//             method: "GET",
//             headers:{
//                 Authorization: token.token
//             }
//         })
//     },
// }