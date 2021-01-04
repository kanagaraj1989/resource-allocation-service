import { connection, Document, Schema } from 'mongoose'
import Resource from "../Model/Resource";
import config from 'config';

const appDB: string = config.get('mongoApplicationDB')
interface ResourceModel extends Document, Resource{
}

const ResourceSchema = new Schema({
  email: String,
  phoneNo: String,
  startDate: Date,
  endDate: Date,
  isAllocated: Boolean,
  projId: String,
  skill: String,
});

export default connection.useDb(appDB).model<ResourceModel>('resources', ResourceSchema)

