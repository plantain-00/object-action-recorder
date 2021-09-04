/**
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default class ObjectActionRecorder<T extends object> implements ProxyHandler<T> {
  public actions: Action[] = []
  public get(target: T, propertyName: string): unknown {
    let result = (target as { [name: string]: unknown })[propertyName]
    if (typeof result === 'function') {
      return (...args: unknown[]) => {
        this.actions.push({
          type: 'method',
          name: propertyName,
          args,
          target,
        })
        result = (target as { [name: string]: (...args: unknown[]) => unknown })[propertyName]?.(...args)
        if (typeof result === 'object' && result !== null) {
          return new Proxy(result, this)
        }
        return result
      }
    } else if (typeof result === 'object' && result !== null) {
      return new Proxy(result, this)
    }
    return result
  }
  public set(target: T, propertyName: string, newValue: unknown): boolean {
    (target as { [name: string]: unknown })[propertyName] = newValue
    this.actions.push({
      type: 'set',
      name: propertyName,
      value: newValue,
      target,
    })
    return true
  }
}

/**
 * @public
 */
export type Action =
  | {
    type: 'method'
    name: string
    args: unknown[]
    target: unknown
  }
  | {
    type: 'set'
    name: string
    value: unknown
    target: unknown
  }
