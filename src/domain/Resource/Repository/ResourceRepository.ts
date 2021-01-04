import Resource from "../Model/Resource";

export interface ResourceRepository {
  saveResource(resource: Resource): Promise<Resource>;
  findByEmail(email: string): Promise<Resource[]>;
  findUnAllocatedResource(): Promise<Resource[]>;
}
