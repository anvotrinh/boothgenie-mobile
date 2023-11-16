import SyncStorage from 'sync-storage'

class Session {
  data: object

  async init() {
    await SyncStorage.init()
  }

  get(key) {
    return SyncStorage.get(key)
  }

  set(key: string, value: any) {
    SyncStorage.set(key, value)
  }
}

export const session = new Session()
