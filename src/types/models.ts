export interface Element {
    id: number;
    title: string;
}

export interface Partition {
    id: number;
    title: string;
    elements: Array<Element>;
}

