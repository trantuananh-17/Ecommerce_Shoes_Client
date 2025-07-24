import dayjs from "dayjs";

export const formatDate = (
  value?: string | null,
  format = "DD/MM/YYYY HH:mm"
) => {
  if (!value) return "Chưa xác định";
  return dayjs(value).format(format);
};

export const formatPrice = (value: number | undefined | null, suffix = "₫") => {
  if (value == null) return "0" + suffix;
  return value.toLocaleString("vi-VN") + ` ${suffix}`;
};

export const formatText = (
  value: string | null | undefined,
  fallback = "Không có"
) => {
  return value?.trim() || fallback;
};
