import Resource from "../Model/Resource";
import {ResourceRepository} from "../Repository/ResourceRepository";
import {MongoResourceRepository} from "../Repository/MongoResourceRepository";

export default class ImportResourceService {
  private repository: ResourceRepository;
  public constructor(private resources: Resource[]) {
    this.repository = new MongoResourceRepository();
  }

  public async import(): Promise<void> {
    for( const resource of this.resources) {
        resource.projId = null;
        resource.isAllocated = false;
        await this.repository.saveResource(resource);
    }
  }
}
