export class Categorie {
    id?: number|null;
    libele: string;

    constructor(libele: string) {
      this.libele = libele;
    }

    public getLibele(): string|undefined {
      return this.libele;
    }
}
