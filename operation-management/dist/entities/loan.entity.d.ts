export declare class Loan {
    static nextId: number;
    id: string;
    copyId: string;
    owner: string;
    ownerLoan: string;
    dateBegin: Date;
    dateEnd: Date;
    closed: boolean;
    constructor(data?: Partial<Loan>);
}
