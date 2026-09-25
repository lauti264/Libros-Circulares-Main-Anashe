export class Assignment {
  static nextId = 0;

  id: string;
  copyId: string;
  owner: string;
  ownerAssignment: string;
  date: Date;

  constructor(data: Partial<Assignment> = {}) {
    Assignment.nextId += 1;
    this.id = data.id ?? `assignment-${Assignment.nextId}`;
    this.copyId = data.copyId ?? '';
    this.owner = data.owner ?? '';
    this.ownerAssignment = data.ownerAssignment ?? '';
    this.date = data.date ?? new Date();
  }
}
