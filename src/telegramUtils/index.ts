import { Context, FrameworkAdapter, MiddlewareFn } from 'grammy'
import { Chat } from '@grammyjs/types'
import IPCIDR from 'ip-cidr'
import { Env } from '../bindings'

export type CloudflareModuleAdapterType = (
  url: URL,
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) => ReturnType<FrameworkAdapter>

export const webhookAdapter: CloudflareModuleAdapterType = (url, request) => {
  let resolveHandler: (response: Response) => void

  const responsePromise = new Promise((resolve) => {
    resolveHandler = resolve
  })

  return {
    handlerReturn: responsePromise,
    update: request.json(),
    end: () => resolveHandler(new Response()),
    unauthorized: () => resolveHandler(new Response(null, { status: 401, statusText: 'secret token is wrong' })),
    respond: (json: string) => resolveHandler(Response.json(json)),
  }
}

export interface WorkerFlavor<E> {
  worker: {
    env: E
    ctx: ExecutionContext
  }
}

export const workerContext = <E, C extends Context = Context>(
  env: E,
  executionContext: ExecutionContext,
): MiddlewareFn<C & WorkerFlavor<E>> => {
  return async (ctx, next) => {
    ctx.worker = { env, ctx: executionContext }

    return next()
  }
}

const telegramCidrCheckers = ['149.154.160.0/20', '91.108.4.0/22'].map((cidr) => new IPCIDR(cidr))
export const isTelegramServerIp = (ip: string) => {
  return telegramCidrCheckers.some((checker) => checker.contains(ip))
}

export const isGroupChat = (chat: Chat): chat is Chat.GroupChat | Chat.SupergroupChat => {
  return chat.type === 'group' || chat.type === 'supergroup'
}
