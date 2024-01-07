import { DocumentResponse } from "../helpers";
import { DocumentError } from "../helpers/DocumentError";
import { User } from "../types/user";

/**
 * An object tracking a single document
 */
class Document {
  /**
   * Tracks user access to a document
   */
  permission: boolean = false;

  constructor() {}

  /**
   * Validates the user's native store name and compares it with the request store's documents
   *
   * @param StoreName the name of the desired store's document
   * @param UserClaim the token claim attribute containing the active user's store
   * @returns OK if the user has access to the store's document and sets this.permission to true
   * @returns ERROR if an error is detected while validating the user's permissions
   */
  permissions?(
    StoreName: string,
    UserClaim: User["storeName"],
  ): DocumentResponse | DocumentError {
    if (StoreName == "" || UserClaim == "") {
      throw new DocumentError(400, "Bad Request");
    } else if (StoreName != UserClaim) {
      throw new DocumentError(404, "Unauthorized");
    } else if (StoreName == UserClaim) {
      this.permission = true;
      return new DocumentResponse(200, "OK");
    } else {
      throw new DocumentError(500, "Internal Server Error");
    }
  }
}

export { Document };
