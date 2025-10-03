let age: number = 27
const nameP: string = "Ana"
let active: boolean = true
let fruits: string[] = ["apple", "banana"]
let numbers: number[] = [1,2,3] 

type User = {
    id: number
    nameP: string
}

let tuple: [number, string] = [1, "Ana"]

function greet(name: string): string {
    return "hello " + name
}

function sum(a: number, b: number): number {
    return a + b
}

function isAdult(age: number): boolean {
    if (age >= 18) {
        return true
    } else {
        return false
    }
}

function showArray(arr: string[]): void {
    console.log(arr)
}

function createUser(user: User): User {
    let newUser = {
        id: user.id,
        nameP: user.nameP
    }

    return newUser
}

type Product = {
    id: number,
    name: string,
    price: number,
    stock: number
}

function applyDiscount(prod: Product, disc: number): Product {
    const price = prod.price
    const applyDisc = (price * disc) / 100
    const finalPrice = price - applyDisc
    return {
        ...prod,
        price: finalPrice
    }
}

function identity<T>(value: T): T {
    return value
}

let identifying = identity<string>("Ana")
let identifying2 = identity<number>(234234)
let identifying3 = identity<boolean>(true)

function first<T>(arr:T[]): T | undefined{
    return arr[0]
}

type ApiResponse<T> = {
    data: T
    success: boolean
    error?: string
}

async function apiUser() :Promise<ApiResponse<User>> {
    return {
        data: {id: 1, nameP: "Ana"},
        success: true
    }
}
