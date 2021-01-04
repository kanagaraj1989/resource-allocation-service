import {ResourceRepository} from "../../Resource/Repository/ResourceRepository";
import {MongoResourceRepository} from "../../Resource/Repository/MongoResourceRepository";
import {ProjectRepository} from "../../Projects/Repository/ProjectRepository";
import MongoProjectRepository from "../../Projects/Repository/MongoProjectRepository";
import Logger from "../../../util/logger/Logger";
import {createAllocationPriorityQueue} from "../../../util/AllocationPriorityQueue";
import Resource from "../../Resource/Model/Resource";
import {PriorityQueue} from "priorityqueue/lib/esm/PriorityQueue";
import Project from "../../Projects/Model/Project";
import {ResourceAllocationRepository} from "../Repository/ResourceAllocationRepository";
import MongoResourceAllocationRepository from "../Repository/MongoResourceAllocationRepository";

export default class AllocationReportService {
  private resourceRepo: ResourceRepository;
  private projectRepo: ProjectRepository;
  private resourceAllocationRepo: ResourceAllocationRepository;

  public constructor() {
    this.resourceRepo = new MongoResourceRepository();
    this.projectRepo = new MongoProjectRepository();
    this.resourceAllocationRepo = new MongoResourceAllocationRepository();
  }

  public async AllocateResource(): Promise<void> {
      const resources = await this.resourceRepo.findUnAllocatedResource()
      const projects = await  this.projectRepo.findUnAllocatedProject();

    const projectContainer = createAllocationPriorityQueue();

    for(const project of projects) {
      projectContainer.push(project)
      Logger.info(`project name=${project.name}`);
    }

    const resourceMap = this.splitResourceBySkill(resources)
    this.matchSkillAndAllocate(projectContainer, resourceMap)

  }

  public splitResourceBySkill(resources: Resource[]): Map<string, PriorityQueue<Resource>> {

    const skills = new Map()
    for(const resource of resources) {
      if (skills.has(resource.skill) ) {
        skills.get(resource.skill).push(resource);
      } else {
        const resourceContainer = createAllocationPriorityQueue();
        resourceContainer.push(resource);
        skills.set(resource.skill, resourceContainer);
      }
    }

    return skills;
  }

  public matchSkillAndAllocate(projContainer: PriorityQueue<Project>, skillMap: Map<string, PriorityQueue<Resource>>) {

    while (projContainer.length > 0) {
      const project = projContainer.pop();
      const resourceBySkill = skillMap.get(project.skill);
      const resource = resourceBySkill.pop();
      if (project.startDate.getTime() === resource.startDate.getTime()
        && resource.endDate.getTime() <= project.endDate.getTime()) {
        Logger.info(`resource ${resource.email} is assigned to project ${project.name}`)
        resource.isAllocated = true;
        resource.projId = project.name;
        project.isResourceAssigned = true;

        this.resourceRepo.saveResource(resource)
        this.projectRepo.saveProject(project)
      } else {
        // Adding back to queue since resource availability macth other project timeline
        resourceBySkill.push(resource);
      }
    }
  }
}
