import { Env } from './bindings'
import { Handler, Router } from './router'
import { routes as appRoutes } from './routes'

const routes: Handler[] = [
  ...appRoutes,
  (url, request) => {
    if (url.pathname !== '/') {
      return
    }

    return new Response(`request method: ${request.method}`)
  },
]

let router: Router

export async function handleRequest(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (!router) {
    router = new Router(routes)
  }

  return await router.handle(request, env, ctx)
}
