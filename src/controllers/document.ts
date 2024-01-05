import { Revenue } from "../types/Revenue";
import { DocumentError, DocumentResponse } from "../types/Document";
import { promises as fs } from "fs";
import { User } from "../types/User";
import { getErrorResponse } from "../helpers/getErrorResponse";

class DocumentController {
  constructor() {}
  async readFile(Name: string, User: User): Promise<Revenue | DocumentError> {
    try {
      this.readFilePermissions(Name, User["storeName"]);
      let file = await fs.readFile(`src/data/${Name}.json`, "utf-8");
      return JSON.parse(file);
    } catch (error: any) {
      return getErrorResponse(error);
    }
  }

  readFilePermissions(
    Name: string,
    UserClaim: User["storeName"],
  ): DocumentResponse | DocumentError {
    if (Name == UserClaim) {
      return { Status: 200, Message: "OK" };
    } else {
      return { Status: 401, Message: "Unauthorized" };
    }
  }
}

export { DocumentController };
