import dayjs from "dayjs";

export function formatDate(d?: Date | string): string {
	if (!d) return "";
	return dayjs(new Date(d)).format("DD MMM, YYYY");
}
