import { DocumentError } from "../types/Document";

const getErrorResponse = (error: any): DocumentError => {
  if ("errno" in error && error["errno"] == -2) {
    return { Status: 404, Message: "File Not Found" };
  } else if ("Status" in error && error["Status"] == 401) {
    return { Status: 401, Message: "Unauthorized" };
  } else {
    return { Status: 500, Message: "Internal Server Error" };
  }
};

export { getErrorResponse };
