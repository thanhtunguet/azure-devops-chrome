export class ServerUrl {
  public url: string;

  public orgName: string;

  public constructor(url: string, orgName: string) {
    this.url = url;
    this.orgName = orgName;
  }

  public get fullUrl(): string {
    return `${this.url}/${this.orgName}`;
  }
}
