import {ResourceAllocation} from "../Model/ResourceAllocation";

export interface ResourceAllocationRepository {
  saveProject(resource: ResourceAllocation): Promise<ResourceAllocation>;
  findAll(): Promise<ResourceAllocation[]>;
}
