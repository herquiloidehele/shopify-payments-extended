class DI {
  private static instance: DI;
  private diMap: Map<string, Object>;

  private constructor() {
    this.diMap = new Map();
  }

  static getInstance(): DI {
    if (!DI.instance) {
      DI.instance = new DI();
    }

    return DI.instance;
  }

  register(name: string, instance: Object): void {
    if (this.diMap.get(name)) {
      return;
    }

    this.diMap.set(name, instance);
  }

  get(name: string): any {
    return this.diMap.get(name) || {};
  }
}

export default DI;
