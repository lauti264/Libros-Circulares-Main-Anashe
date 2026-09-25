export class UnsubscribeB {
  static nextId = 0;

  id: string;
  copyId: string;
  date: Date;

  constructor(data: Partial<UnsubscribeB> = {}) {
    UnsubscribeB.nextId += 1;
    this.id = data.id ?? `unsuscribe-b-${UnsubscribeB.nextId}`;
    this.copyId = data.copyId ?? '';
    this.date = data.date ?? new Date();
  }
}
