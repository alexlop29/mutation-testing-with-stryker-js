import { Document } from "../../controllers";
import { DocumentError, DocumentResponse } from "../../helpers";
import { joeAtFreshKicks, steveAtUnknown } from "../fixtures/personas";

describe("Should describe the document controller, methods, and properties", () => {
  test("Should set permissions to undefined when the document is created", () => {
    let document = new Document("freshkicks", joeAtFreshKicks["storeName"]);
    expect(document.permission).toBe(undefined);
  });
  test("Should return 200 if the user has access to a document", () => {
    let document = new Document("freshkicks", joeAtFreshKicks["storeName"]);
    expect(document.permissions()).toEqual(new DocumentResponse(200, "OK"));
    expect(document.permission).toBe(true);
  });
  test("Should return 400 if the user submits an empty storename", () => {
    let document = new Document("", joeAtFreshKicks["storeName"]);
    expect(() => document.permissions()).toThrow(
      new DocumentError(400, "Bad Request"),
    );
    expect(document.permission).toBe(undefined);
  });
  test("Should return 400 if the user submits an empty storename", () => {
    let document = new Document("", joeAtFreshKicks["storeName"]);
    expect(() => document.permissions()).toThrow(
      new DocumentError(400, "Bad Request"),
    );
    expect(document.permission).toBe(undefined);
  });
  test("Should return 400 if the user submits an empty storeName claim", () => {
    let document = new Document("freshKicks", steveAtUnknown["storeName"]);
    expect(() => document.permissions()).toThrow(
      new DocumentError(400, "Bad Request"),
    );
    expect(document.permission).toBe(undefined);
  });
  test("Should return 401 if the user does not have permission to access the document", () => {
    let document = new Document("deliciouspie", joeAtFreshKicks["storeName"]);
    expect(() => document.permissions()).toThrow(
      new DocumentError(401, "Unauthorized"),
    );
    expect(document.permission).toBe(undefined);
  });
});
