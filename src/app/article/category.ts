export class Category {
    id: number;
    libele: string;

    constructor(id: number, libele: string) {
      this.id = id;
      this.libele = libele;
    }

    public getLibele(): string|undefined {
      return this.libele;
    }
}
