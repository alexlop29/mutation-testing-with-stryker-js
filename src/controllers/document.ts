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

  constructor(
    public readonly StoreName: string,
    public readonly UserClaim: User["storeName"],
  ) {
  }
  /**
   * Validates the user's native store name and compares it with the request store's documents
   *
   * @param StoreName the name of the desired store's document
   * @param UserClaim the token claim attribute containing the active user's store
   * @returns
   * DocumentResponse(200, "OK")
   * DocumentError(400, "Bad Request")
   * DocumentError(401, "Unauthorized")
   * DocumentError(500, "Internal Server Error")
   */
  permissions(): DocumentResponse | DocumentError {
    if (this.StoreName == "" || this.UserClaim == "") {
      throw new DocumentError(400, "Bad Request");
    } else if (this.StoreName != this.UserClaim) {
      throw new DocumentError(401, "Unauthorized");
    } else if (this.StoreName == this.UserClaim) {
      this.permission = true;
      return new DocumentResponse(200, "OK");
    } else {
      throw new DocumentError(500, "Internal Server Error");
    }
  }
}

export { Document };
