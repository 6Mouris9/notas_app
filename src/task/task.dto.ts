export class TaskDto{
    title: string;
    content: string;
    autor: string
    creationDate: Date;
    tags: string[]
}

export interface FindAllParameters{
    title: string;
    autor: string;

}