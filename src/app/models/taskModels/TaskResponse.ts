export interface TaskRessponse{
    id?: any,
    title?:string,
    detail?:string,
    dueDate?: Date,
    isCompleted?: boolean,
    email?: string
}
export interface DuttyResponse{
    title :string
    message :string
    operation :string
    statusOperation : boolean 
}