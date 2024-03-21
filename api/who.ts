import { api_host } from "@/const/host";
import { PortfolioConfig } from "@/helpers/getPortfolio";
import { authorizationHeader } from "@darkmaterial/api";

export const who = async (
  id: string,
  visitor?: string
): Promise<PortfolioConfig | null> => {
  try {
    const headers = new Headers();
    const authHeader = authorizationHeader();
    headers.append("authorization", authHeader || "");
    const url = `${api_host}/shots/who/${id}${
      visitor ? `?visitor=${visitor}` : ""
    }`;
    const res = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (res.ok) {
      return await res.json();
    } else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
