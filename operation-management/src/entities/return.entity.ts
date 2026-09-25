export class ReturnOperation {
  static nextId = 0;

  id: string;
  loanId: string;
  date: Date;

  constructor(data: Partial<ReturnOperation> = {}) {
    ReturnOperation.nextId += 1;
    this.id = data.id ?? `return-${ReturnOperation.nextId}`;
    this.loanId = data.loanId ?? '';
    this.date = data.date ?? new Date();
  }
}
