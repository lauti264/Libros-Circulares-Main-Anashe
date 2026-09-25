export class Loan {
  static nextId = 0;

  id: string;
  copyId: string;
  owner: string;
  ownerLoan: string;
  dateBegin: Date;
  dateEnd: Date;
  closed: boolean;

  constructor(data: Partial<Loan> = {}) {
    Loan.nextId += 1;
    this.id = data.id ?? `loan-${Loan.nextId}`;
    this.copyId = data.copyId ?? '';
    this.owner = data.owner ?? '';
    this.ownerLoan = data.ownerLoan ?? '';
    this.dateBegin = data.dateBegin ?? new Date();
    this.dateEnd = data.dateEnd ?? new Date();
    this.closed = data.closed ?? false;
  }
}
