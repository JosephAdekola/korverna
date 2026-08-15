
export type ApiFetchOptions = Omit<RequestInit, "body"> & {
    params?: Record<string, string | number | boolean | null | undefined>;
    body?: unknown;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

export class ApiError<T = unknown> extends Error {
    status: number;
    data: T;

    constructor(message: string, status: number, data: T) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

export async function apiFetch<T = unknown>(
    url: string,
    options: ApiFetchOptions = {}
): Promise<ApiResponse<T>> {
    const {
        params,
        body,
        headers,
        ...requestOptions
    } = options;

    const query = new URLSearchParams();

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query.set(key, String(value));
            }
        });
    }

    const queryString = query.toString();

    const finalUrl = queryString
        ? `${url}${url.includes("?") ? "&" : "?"}${queryString}`
        : url;

    const isFormData = body instanceof FormData;
    const isBodyPresent =
        body !== undefined && body !== null;

    const finalHeaders = new Headers(headers);

    // Don't manually set Content-Type for FormData.
    // The browser needs to generate the multipart boundary.
    if (isBodyPresent && !isFormData && !finalHeaders.has("Content-Type")) {
        finalHeaders.set("Content-Type", "application/json");
    }

    const response = await fetch(finalUrl, {
        ...requestOptions,
        headers: finalHeaders,
        body: isBodyPresent
            ? isFormData
                ? body
                : JSON.stringify(body)
            : undefined,
    });

    let responseData: unknown;

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
        responseData = await response.json();
    } else {
        responseData = await response.text();
    }

    if (!response.ok) {
        const errorData =
            typeof responseData === "object" && responseData !== null
                ? responseData
                : {
                    success: false,
                    message: response.statusText || "Request failed",
                    data: responseData,
                };

        throw new ApiError(
            "message" in errorData &&
                typeof errorData.message === "string"
                ? errorData.message
                : "Request failed",
            response.status,
            errorData
        );
    }

    return responseData as ApiResponse<T>;
}



export const api = {
    get: <T = unknown>(
        url: string,
        options?: Omit<ApiFetchOptions, "body" | "method">
    ) =>
        apiFetch<T>(url, {
            ...options,
            method: "GET",
        }),

    post: <T = unknown>(
        url: string,
        body?: unknown,
        options?: Omit<ApiFetchOptions, "body" | "method">
    ) =>
        apiFetch<T>(url, {
            ...options,
            method: "POST",
            body,
        }),

    put: <T = unknown>(
        url: string,
        body?: unknown,
        options?: Omit<ApiFetchOptions, "body" | "method">
    ) =>
        apiFetch<T>(url, {
            ...options,
            method: "PUT",
            body,
        }),

    patch: <T = unknown>(
        url: string,
        body?: unknown,
        options?: Omit<ApiFetchOptions, "body" | "method">
    ) =>
        apiFetch<T>(url, {
            ...options,
            method: "PATCH",
            body,
        }),

    delete: <T = unknown>(
        url: string,
        options?: Omit<ApiFetchOptions, "body" | "method">
    ) =>
        apiFetch<T>(url, {
            ...options,
            method: "DELETE",
        }),
};