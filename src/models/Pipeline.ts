export class Pipeline {
  id: number; // The unique ID of the pipeline

  name: string; // The name of the pipeline

  url: string; // The URL to the pipeline on the Azure DevOps server

  folder: string;

  constructor(id: number, name: string, url: string, folder: string) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.folder = folder;
  }
}
