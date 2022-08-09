export default class ApiError extends Error{

    public status:number;  
    
    public error?:any[];

    constructor(status:number,message:string, error:any[] = []){
        super(message);

        this.status = status;

        this.error = error;
    }   
    

    static UnaftorilizeUser():ApiError{
        return new ApiError(401, "Пользователь не авторизован");
    }

    static BadRequest(message:string, errors = []):ApiError{
        return new ApiError(400, message, errors)
    }
}