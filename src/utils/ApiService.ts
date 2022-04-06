import { Profile } from "../types";

export enum ApiPath {
  REGISTER_DID = "/v1/did/register/",
  GET_PROFILE_VIA_DID = "/v1/did/getProfileViaDid/",
  GET_ALL_DIDS = "/v1/did/getAllDids",
  GET_ALL_PROFILES = "/v1/did/getAllProfiles",
}

export class ApiService {
  public url = "http://localhost:8083";
  public api = ApiPath;

  constructor() {}

  public async registerDid(did: string): Promise<boolean> {
    return this.request(this.api.REGISTER_DID + did, "POST");
  }

  public async getProfileViaDid(did: string): Promise<Profile> {
    return this.request(this.api.GET_PROFILE_VIA_DID + did);
  }

  public async getAllDids(): Promise<string[]> {
    return this.request(this.api.GET_ALL_DIDS);
  }

  public async getAllProfiles(): Promise<Profile[]> {
    return this.request(this.api.GET_ALL_PROFILES);
  }

  private async request(path: string, method: "GET" | "DELETE" | "PUT" | "POST" = "GET"): Promise<any> {
    const response = await fetch(`${this.url}${path}`, {
      method,
    });
    const responseIsJson = response.headers.get("content-type")?.indexOf("application/json") === 0;

    if (!response.ok) {
      let errorMessage;
      if (responseIsJson) {
        const errorJson = await response.json();
        if (errorJson?.error?.message) {
          errorMessage = errorJson.error.message;
          if (errorJson.error.code) {
            errorMessage += ` (${errorJson.error.code})`;
          }
        } else {
          errorMessage = JSON.stringify(errorJson);
        }
      } else {
        errorMessage = await response.text();
      }
      console.error("[ApiService] Error", response.status, errorMessage);
      throw new Error("[ApiService] Error: " + errorMessage);
    }

    if (responseIsJson) {
      try {
        return await response.json();
      } catch (err) {
        if (response.headers.get("content-length") === "0") {
          throw new Error('[ApiService] Error: API returned invalid JSON: ""');
        }
        throw err;
      }
    } else {
      return await response.text();
    }
  }
}
