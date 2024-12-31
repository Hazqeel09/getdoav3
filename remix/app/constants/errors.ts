export const ERROR_RESPONSES = {
  INVALID_ARGUMENT: () =>
    new Response(JSON.stringify({ message: "Invalid argument" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    }),
  UNAUTHORIZED: () =>
    new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    }),
  NOT_FOUND: () =>
    new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }),
};

export type errorResponseType = ReturnType<
  (typeof ERROR_RESPONSES)[keyof typeof ERROR_RESPONSES]
>;
