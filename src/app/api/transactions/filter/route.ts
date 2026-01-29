import { TransactionsService } from "@/app/services/transactions.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const range = searchParams.get("range")
        const type = searchParams.get("type")

        const validRange = range && range !== 'null' ? range : null
        const validType = type && type !== 'null' && type !== 'All' ? type : null

        const page = Number(searchParams.get("page")) || 1
        const limit = Number(searchParams.get("limit")) || 10

        const activity = await TransactionsService.getActivity()

        const now = new Date()

        const ranges: Record<string, () => Date> = {
            today: () => {
                const d = new Date()
                d.setHours(0, 0, 0, 0)
                return d
            },
            yesterday: () => {
                const d = new Date()
                d.setDate(d.getDate() - 1)
                return d
            },
            lastWeek: () => {
                const d = new Date()
                d.setDate(d.getDate() - 7)
                return d
            },
            last15: () => {
                const d = new Date()
                d.setDate(d.getDate() - 15)
                return d
            },
            lastMonth: () => {
                const d = new Date()
                d.setMonth(d.getMonth() - 1)
                return d
            },
            lastYear: () => {
                const d = new Date()
                d.setFullYear(d.getFullYear() - 1)
                return d
            }
        }

        let filtered = activity;


        if (validRange && ranges[validRange]) {
            const startDate = ranges[validRange]()
            filtered = filtered.filter(item => new Date(item.dated) >= startDate)
        }

        if (validType) {
            filtered = filtered.filter(item => item.type === validType)
        }

        const hasFilters = !!validRange || !!validType

        if (!hasFilters) {
            return NextResponse.json({
                data: filtered
            })
        }

        const start = (page - 1) * limit
        const paginated = filtered.slice(start, start + limit)

        return NextResponse.json({
            page,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / limit),
            data: paginated
        })

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error trying get activity");
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}