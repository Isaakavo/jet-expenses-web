export class AuthenticationResult {
  AccessToken!: string;
  ExpiresIn!: number;
  IdToken!: string;
  RefreshToken!: string;
  TokenType!: string;

  constructor(jsonObj?: AuthenticationResult) {
    if(jsonObj) {
      this.AccessToken = jsonObj.AccessToken;
      this.ExpiresIn = jsonObj.ExpiresIn;
      this.IdToken = jsonObj.IdToken;
      this.RefreshToken = jsonObj.RefreshToken;
      this.TokenType = jsonObj.TokenType;
    }
  }
}