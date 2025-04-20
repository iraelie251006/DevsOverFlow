import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./error";

interface FetchOptions extends RequestInit {
    timeout?: number
}

function isError(error: unknown): error is Error {
    return error instanceof Error
}
export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
    const { timeout = 100000, headers: customHeader = {}, ...restOptions } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        accept: "application/json",
    }

    const headers: HeadersInit = {...defaultHeaders, ...customHeader};
    const config: RequestInit = {...restOptions, headers, signal: controller.signal};

    try {
        const response = await fetch(url, config);
        clearTimeout(id)
        if (!response.ok) {
            throw new RequestError(response.status, `HTTP error: ${response.status}`)
        }
        return response.json();
    } catch (err) {
        const error = isError(err) ? err : new Error("Unknown Error")

        if (error.name === "AbortError") {
            logger.warn(`Request to ${url} was aborted due to timeout`)
        } else {
            logger.error(`Error fetching ${url}: ${error.message}`)
        }

        return handleError(error) as ActionResponse<T>
    }
}
