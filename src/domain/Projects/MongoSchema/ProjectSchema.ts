import config from 'config';
import Project from "../Model/Project";
import { connection, Document, Schema } from 'mongoose'

const appDB: string = config.get('mongoApplicationDB')

 interface ProjectModel extends Document, Project {
 }

 const projectSchema = new Schema({
   name: String,
   skill: String,
   startDate: Date,
   endDate: Date,
   isResourceAssigned: Boolean,
 });

export default connection.useDb(appDB).model<ProjectModel>('projects', projectSchema)
