export const ERROR_RESPONSES = {
  INVALID_ARGUMENT: Response.json({message: 'Invalid argument'}, {status: 400}),
  UNAUTHORIZED: Response.json({message: 'Unauthorized'}, {status: 401}),
  NOT_FOUND: Response.json({message: 'Not found'}, {status: 404}),
}

export type errorResponseType = typeof ERROR_RESPONSES[keyof typeof ERROR_RESPONSES]
