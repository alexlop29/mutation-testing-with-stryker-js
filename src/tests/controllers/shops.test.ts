import { ShopController } from "../../controllers/shop";
import { DocumentError } from "../../types/Document";
import { Revenue } from "../../types/Revenue";
import { joeAtFreshKicks, kyleAtAwesomeSocks } from "../fixtures/personas";

describe("Should describe the shop controller", () => {
  test("Should return all available shops", () => {
    const shop = new ShopController();
    expect(shop.getAllShops()).toStrictEqual({
      Shops: [
        {
          Name: "Delicious Pie",
        },
        {
          Name: "Fresh Kicks",
        },
      ],
    });
  });
  test("Should return a revenue report if the user has access to the shop", async () => {
    const shop = new ShopController();
    expect(
      await shop.getShopRevenue("freshkicks", joeAtFreshKicks),
    ).toStrictEqual({
      Name: "Fresh Kicks",
      Revenue: 500.0,
    });
  });
  test("Should return 401 if the user does not have access to the shop", async () => {
    const shop = new ShopController();
    let response: Revenue | DocumentError = await shop.getShopRevenue(
      "deliciouspie",
      joeAtFreshKicks,
    );
    if ("Status" in response && "Message" in response) {
      expect(response["Status"]).toEqual(401);
      expect(response["Message"]).toBe("Unauthorized");
    }
  });
  test("Should return 404 if the user has access, but the revenue report is not found", async () => {
    const shop = new ShopController();
    let response: Revenue | DocumentError = await shop.getShopRevenue(
      "awesomesocks",
      kyleAtAwesomeSocks,
    );
    if ("Status" in response && "Message" in response) {
      expect(response["Status"]).toEqual(404);
      expect(response["Message"]).toBe("File Not Found");
    }
  });
});
