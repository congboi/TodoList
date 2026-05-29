import { Label } from "radix-ui"

export const FilterType = {
    all: "tất cả",
    active: "đang làm",
    completed: "hoàn thành",   
}
export const options = [
    {
        value: "Hôm nay",
        label: "Hôm nay"
    },
    {
        value: "Tuần này",
        label: "Tuần này"
    },
    {
        value: "Tháng này",
        label: "Tháng này"
    },
    {
        value: "Tất cả",
        label: "Tất cả"
    }
]
export const visibleTaskLimit = 4;