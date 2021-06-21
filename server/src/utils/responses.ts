import { IResDetails } from "../interfaces/interface";

export const resTemplate: IResDetails = {
  success: {
    general: {
      success: true,
      status: 200,
    },
    created: {
      success: true,
      status: 201,
    },
    noContent: {
      success: true,
      status: 204,
      message: "No Content Was Found",
    },
  },
  serverError: {
    success: false,
    status: 500,
    message: "Server Error",
  },
  clientError: {
    badRequest: {
      success: false,
      status: 400,
      message: "Error - Bad Request",
    },
    unAuthorized: {
      success: false,
      status: 401,
      message: "Unauthorized - Lack of Valid Credentials",
    },
    forbidden: {
      success: false,
      status: 403,
      message: "Access Forbidden",
    },
  },
};
