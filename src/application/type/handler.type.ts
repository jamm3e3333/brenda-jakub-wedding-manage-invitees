export type HandlerType<TCommandOrTQuery, TData> =
    (commandOrQuery: TCommandOrTQuery) => PromiseLike<TData> | TData
