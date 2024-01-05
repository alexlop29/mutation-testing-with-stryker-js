import { DocumentController } from "../../controllers/document";
import { Revenue } from "../../types/Revenue";
import { DocumentError, DocumentResponse } from "../../types/Document";
import { joeAtFreshKicks, kyleAtAwesomeSocks } from "../fixtures/personas";

describe("Should describe the document controller", () => {
  test("Should return 200 if the user has access to the file", () => {
    let document = new DocumentController();
    let contents: DocumentResponse | DocumentError =
      document.readFilePermissions("freshkicks", joeAtFreshKicks["storeName"]);
    expect(contents["Status"]).toEqual(200);
    expect(contents["Message"]).toBe("OK");
  });

  test("Should return 401 if the user does not have access to the file", () => {
    let document = new DocumentController();
    let contents: DocumentResponse | DocumentError =
      document.readFilePermissions(
        "deliciouspie",
        joeAtFreshKicks["storeName"],
      );
    expect(contents["Status"]).toEqual(401);
    expect(contents["Message"]).toBe("Unauthorized");
  });

  test("Should return the file contents when the user requests a file and has access to it", async () => {
    let document = new DocumentController();
    expect(
      await document.readFile("freshkicks", joeAtFreshKicks),
    ).toStrictEqual({
      Name: "Fresh Kicks",
      Revenue: 500.0,
    });
  });

  test("Should return 401 when the user requests a file and does not have access to it", async () => {
    let document = new DocumentController();
    let response: Revenue | DocumentError = await document.readFile(
      "deliciouspie",
      joeAtFreshKicks,
    );
    if ("Status" in response && "Message" in response) {
      expect(response["Status"]).toEqual(401);
      expect(response["Message"]).toBe("Unauthorized");
    }
  });

  test("Should return 404 when the user requests a file, has access, but it is not found", async () => {
    let document = new DocumentController();
    let contents: Revenue | DocumentError = await document.readFile(
      "awesomesocks",
      kyleAtAwesomeSocks,
    );
    if ("Status" in contents && "Message" in contents) {
      expect(contents["Status"]).toEqual(404);
      expect(contents["Message"]).toBe("File Not Found");
    }
  });
});
