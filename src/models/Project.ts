export class Project {
  id: number; // The unique ID of the project

  name: string; // The name of the project

  description?: string; // Optional: Project description

  url: string; // The URL to the project on the Azure DevOps server

  state: string; // The current state of the project (wellFormed, deleting, new, etc.)

  visibility: string; // The visibility of the project (public, private)

  lastUpdateTime: Date; // Last update time for the project

  revision: number; // Project revision number

  constructor(
    id: number,
    name: string,
    description: string,
    url: string,
    state: string,
    visibility: string,
    lastUpdateTime: Date | string,
    revision: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.state = state;
    this.visibility = visibility;
    this.lastUpdateTime =
      typeof lastUpdateTime === 'string'
        ? new Date(lastUpdateTime)
        : lastUpdateTime;
    this.revision = revision;
  }
}
