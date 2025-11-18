import { TransactionsService } from "@/app/services/transactions.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const range = searchParams.get("range")
        const type = searchParams.get("type")
        const page = Number(searchParams.get("page")) || 1
        const limit = Number(searchParams.get("limit")) || 10

        const activity = await TransactionsService.getActivity()

        const now = new Date()

        const ranges: Record<string, () => Date> = {
            today: () => new Date(now.setHours(0, 0, 0, 0)),
            yesterday: () => new Date(now.setDate(now.getDate() - 1)),
            lastWeek: () => new Date(now.setDate(now.getDate() - 7)),
            last15: () => new Date(now.setDate(now.getDate() - 15)),
            lastMonth: () => new Date(now.setMonth(now.getMonth() - 1)),
            lastYear: () => new Date(now.setFullYear(now.getFullYear() - 1)),
        }

        let filtered = activity;


        if (range && ranges[range]) {
            const startDate = ranges[range]()
            filtered = filtered.filter(item => new Date(item.dated) >= startDate)
        }

        if (type && type !== "All") {
            filtered = filtered.filter(item => item.type === type)
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
