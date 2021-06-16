import { IResDetails } from "../interfaces/interface"

export const resTemplate: IResDetails = {
    success: { 
        general:{
            success: true,
            status: 200,
        },
        created: {
            success: true,
            status: 201,
        }
    },
    serverError: {
        success:false,
        status:500,
        message: "Server Error"
    },
    clientError: {
        badRequest: {
            success: false,
            status: 400,
            message: "Error Due To Empty Body"
        },
        unAuthorized: {
                success: false,
                status: 401,
                message: "Unauthorized - Lack of Valid Credentials"
        },
        forbidden: {
                success: false,
                status: 403,
                message: "Access Forbidden"
        }
    }
}
