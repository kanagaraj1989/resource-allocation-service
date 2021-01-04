
import {ResourceAllocationRepository} from "./ResourceAllocationRepository";
import {ResourceAllocation} from "../Model/ResourceAllocation";
import ResourceAllocationModel from '../MongoSchema/ResourceAllocationSchema'
export default class MongoResourceAllocationRepository implements ResourceAllocationRepository{
  findAll(): Promise<ResourceAllocation[]> {
    return ResourceAllocationModel.find({}).exec();
  }

  saveProject(resource: ResourceAllocation): Promise<ResourceAllocation> {
    return ResourceAllocationModel.updateOne({
      email: resource.email,
      projectName: resource.projectName,
      startDate: resource.startDate
    },
      {
        $set: {
          endDate: resource.endDate
        }
        },
      {
        upsert: true
      })
      .exec();
  }
}
