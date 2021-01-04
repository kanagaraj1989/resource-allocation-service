import {ProjectRepository} from "./ProjectRepository";
import Project from "../Model/Project";
import ProjectModel from '../MongoSchema/ProjectSchema'

export default class MongoProjectRepository implements ProjectRepository {
  findByName(email: string): Promise<Project[]> {
    return undefined;
  }

  saveProject(project: Project): Promise<Project> {
    return ProjectModel
      .updateOne(
        {
          name: project.name,
          startDate: project.startDate
        },
        {
          $set: {
            skill: project.skill,
            endDate: project.endDate,
            isResourceAssigned: project.isResourceAssigned
          }
        },
        { upsert: true}
        ).exec();
  }

  findUnAllocatedProject(): Promise<Project[]> {
    return ProjectModel.find({isResourceAssigned: false}).sort({startDate: 0}).exec();
  }

}
