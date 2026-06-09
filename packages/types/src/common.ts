export type Paginated<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type SortOrder = "asc" | "desc";

export type WithTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type SeoMeta = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  canonicalUrl?: string | null;
};
