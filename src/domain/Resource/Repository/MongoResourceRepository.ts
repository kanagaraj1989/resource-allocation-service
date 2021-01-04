import {ResourceRepository} from "./ResourceRepository";
import ResourceModel from '../MongoSchema/ResourceSchema'
import Resource from "../Model/Resource";
import Logger from "../../../util/logger/Logger";

export class MongoResourceRepository extends ResourceModel implements ResourceRepository {
  public async findByEmail(email: string): Promise<Resource[]> {
    return undefined;
  }

  public async saveResource(resource: Resource): Promise<Resource> {
     return await ResourceModel.updateOne({
        email: resource.email,
        startDate: resource.startDate
      }, {
        $set: {
          endDate: resource.endDate,
          isAllocated: resource.isAllocated,
          projId: resource.projId,
          skill: resource.skill
        },
      },
        {
          upsert: true,
        }).exec()
  }

  findUnAllocatedResource(): Promise<Resource[]> {
    return ResourceModel.find({isAllocated: false}).exec();
  }

}
