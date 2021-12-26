import { Env } from './bindings'

const DEFAULT_HANDLER = () => {
  return new Response(`Couldn't find a handler for your response`, {
    status: 404,
  })
}

type HandlerResultType = void | Response

export type Handler = (
  url: URL,
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) => HandlerResultType | Promise<HandlerResultType>

export class Router {
  protected handlers: Handler[] = []

  constructor(handlers: Handler[]) {
    this.handlers = handlers
  }

  async handle(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    for (const handler of this.handlers) {
      const response = await handler(url, request, env, ctx)
      if (response) {
        return response
      }
    }

    return DEFAULT_HANDLER()
  }
}
