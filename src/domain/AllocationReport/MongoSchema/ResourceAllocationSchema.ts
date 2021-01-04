import {ResourceAllocation} from "../Model/ResourceAllocation";
import {Schema, Document, connection} from "mongoose";
import config from "config";

const appDB: string = config.get('mongoApplicationDB')

interface ResourceAllocationModel extends Document, ResourceAllocation{}

const resourceAllocationSchema = new Schema({
  email: String,
  projectName: String,
  startDate: Date,
  endDate: Date,
});

export default connection.useDb(appDB).model<ResourceAllocationModel>('projects', resourceAllocationSchema)
