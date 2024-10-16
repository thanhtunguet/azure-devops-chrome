import type {AxiosInstance} from 'axios';
import axios from 'axios';
import {Pipeline} from 'src/models/Pipeline';
import {Project} from 'src/models/Project';

export class DevopsRepository {
  private readonly http: AxiosInstance;

  private static readonly API_VERSION = '6.0-preview';

  public readonly withApiVersion = (url: string): string => {
    const urlObject = new URL(url);
    urlObject.searchParams.set('api-version', DevopsRepository.API_VERSION);
    return urlObject.toString();
  };

  constructor(
    public readonly serverUrl: string,
    public readonly collectionId: string,
  ) {
    this.http = axios.create({
      baseURL: `${serverUrl}/${collectionId}`,
    });
  }

  public readonly getProjects = async (): Promise<Project[]> => {
    const response = await this.http.get(
      `/_apis/projects?api-version=${DevopsRepository.API_VERSION}`,
    );
    return response.data.value.map(
      (project: any) =>
        new Project(
          project.id,
          project.name,
          project.description,
          project.url,
          project.state,
          project.visibility,
          project.lastUpdateTime,
          project.revision,
        ),
    );
  };

  public readonly getPipelines = async (
    project: Project,
  ): Promise<Pipeline[]> => {
    const response = await this.http.get(
      `/${project.name}/_apis/pipelines?api-version=${DevopsRepository.API_VERSION}`,
    );
    return response.data.value.map(
      (pipeline: any) =>
        new Pipeline(pipeline.id, pipeline.name, pipeline.description),
    );
  };

  public readonly triggerPipeline = async (
    project: Project,
    pipelineId: number,
  ): Promise<void> => {
    await this.http.post(
      `/${project.name}/_apis/pipelines/${pipelineId}/runs?api-version=${DevopsRepository.API_VERSION}`,
      {},
    );
  };
}
