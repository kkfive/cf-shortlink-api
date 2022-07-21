export class KvHelper {
  constructor(private readonly kv: KVNamespace) {
    this.kv = kv
  }
  async check(key: string): Promise<boolean> {
    return (await this.kv.get(key)) ? true : false
  }
  async save(key: string, value: string): Promise<boolean> {
    await this.kv.put(key, value)
    return true
  }
  async get(key: string): Promise<string | null> {
    return await this.kv.get(key)
  }
  async remove(key: string): Promise<boolean> {
    const flag = await this.check(key)
    let result = false
    if (flag) {
      await this.kv.delete(key)
      result = true
    }
    return result
  }
  async list() {
    return await this.kv.list()
  }
}
