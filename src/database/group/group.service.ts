import { Injectable } from '@nestjs/common';
import { Group, GroupDocument } from './group.schema';
import { GroupDto } from './group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel('Group') private readonly groupModel: Model<GroupDocument>,
  ) {}

  public async createGroup(createGroupDto: GroupDto): Promise<boolean | Group> {
    const group = await this.findByName(createGroupDto.name);

    if (group) {
      return false;
    }

    return new this.groupModel(createGroupDto).save();
  }

  public findByName(name): Promise<Group> {
    return this.groupModel.findOne({ name: name }).exec();
  }

  public async updateParticipants(groupName, name, card): Promise<Group> {
    const group: GroupDto = await this.findByName(groupName);
    const { participants } = group;

    if (participants.find((participant) => participant.name === name)) {

    }
  }
}
