import { setAccessToken } from "../__sdk-context";
import { products } from "@wix/stores/context";

export function app1SomethingLikeACustomElement(getAcessToken: () => string) {
  const accessToken = getAcessToken();

  setAccessToken(accessToken);

  const button = document.createElement("button");
  button.onclick = async () => {
    const { items } = await products.queryProducts().find();
    console.log("app 1 products", items);
  };
  button.innerText = "App 1 Print Products";
  document.body.appendChild(button);
}
