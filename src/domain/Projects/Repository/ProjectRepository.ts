import Project from "../Model/Project";

export interface ProjectRepository {
  saveProject(resource: Project): Promise<Project>;
  findByName(email: string): Promise<Project[]>;
  findUnAllocatedProject(): Promise<Project[]>;
}
