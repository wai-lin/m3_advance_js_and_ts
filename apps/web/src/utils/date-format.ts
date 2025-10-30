import dayjs from "dayjs";

export function formatDate(d: Date | string): string {
	return dayjs(new Date(d)).format("DD MMM, YYYY");
}
