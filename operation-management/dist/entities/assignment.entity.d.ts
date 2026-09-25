export declare class Assignment {
    static nextId: number;
    id: string;
    copyId: string;
    owner: string;
    ownerAssignment: string;
    date: Date;
    constructor(data?: Partial<Assignment>);
}
