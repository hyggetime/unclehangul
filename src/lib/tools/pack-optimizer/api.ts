import {
  emptyOptimizeResponse,
  type OptimizeRequest,
  type OptimizeResponse,
} from "@/lib/tools/pack-optimizer/types";

export async function fetchOptimizeResult(
  payload: OptimizeRequest,
  signal?: AbortSignal,
): Promise<OptimizeResponse> {
  const response = await fetch("/api/v1/optimize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  const data: unknown = await response.json();

  if (
    typeof data === "object" &&
    data !== null &&
    "status" in data &&
    (data as { status: string }).status === "error" &&
    "errorCode" in data &&
    !("strategies" in data)
  ) {
    const message =
      "errorMessage" in data && typeof (data as { errorMessage?: unknown }).errorMessage === "string"
        ? (data as { errorMessage: string }).errorMessage
        : undefined;
    return emptyOptimizeResponse(message);
  }

  return data as OptimizeResponse;
}
