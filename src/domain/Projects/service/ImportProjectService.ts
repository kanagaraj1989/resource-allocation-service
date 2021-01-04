import Project from "../Model/Project";
import {ProjectRepository} from "../Repository/ProjectRepository";
import MongoProjectRepository from "../Repository/MongoProjectRepository";

export default class ImportProjectService {
  private repository: ProjectRepository;
  public constructor(private projects: Project[]) {
    this.repository = new MongoProjectRepository();
  }

  public async import(): Promise<void> {
    for( const project of this.projects) {
      project.isResourceAssigned = false;
      await this.repository.saveProject(project);
    }
  }
}
