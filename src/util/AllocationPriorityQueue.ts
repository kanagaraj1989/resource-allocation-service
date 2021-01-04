import PriorityQueue from "priorityqueue";
import Project from "../domain/Projects/Model/Project";
import Resource from "../domain/Resource/Model/Resource";

type Comparator<T> = (obj1: any, obj2: any) => T

// Sort the project/resource based on project_start_date and shortest timeline
const projectComparator = (cmpObj1: Project | Resource, cmpObj2: Project | Resource): number => {
  const cmpObj1Val = (cmpObj1.startDate.getTime() / 1000 ) + ((cmpObj1.endDate.getTime() / 1000) - (cmpObj1.startDate.getTime() / 1000))
  const cmpObj2Val = (cmpObj2.startDate.getTime() / 1000 ) + ((cmpObj2.endDate.getTime() / 1000) - (cmpObj2.startDate.getTime() / 1000))
  return cmpObj1Val - cmpObj2Val;
}

const createPriorityQueue = (comparator: Comparator<number>) => new PriorityQueue({ comparator });

export const createAllocationPriorityQueue = () => createPriorityQueue(projectComparator);





