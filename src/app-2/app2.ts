import { createClient } from "@wix/sdk";
import { context } from "@wix/sdk-context";
import { products } from "@wix/stores/context";

export function app2SomethingLikeACustomElement(getAcessToken: () => string) {
  const accessToken = getAcessToken();

  // This sets a client in the module tree of this app's specific bundle
  context.client = createClient({
    headers: {
      Authorization: accessToken,
    },
  });

  const button = document.createElement("button");
  button.onclick = async () => {
    const { items } = await products.queryProducts().find();
    console.log("app 2 products", items);
  };
  button.innerText = "App 2 Print Products";
  document.body.appendChild(button);
}
