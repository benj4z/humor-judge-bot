import { Injectable } from '@nestjs/common';
import { Group, GroupDocument } from './group.schema';
import { GroupDto, Participant } from './group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommandsNames } from '../../commands/enums/comands.enum';

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

  public findByName(name): Promise<GroupDocument> {
    return this.groupModel.findOne({ name: name }).exec();
  }

  public async updateParticipants(
    groupName,
    replyUser,
    action,
  ): Promise<Group> {
    const group = await this.findByName(groupName);
    const { participants } = group;

    const person = participants.find(
      (participant) => participant.id === replyUser.id,
    );

    if (person) {
      action === CommandsNames.red ? person.redCard++ : person.yellowCard++;
    } else {
      group.participants.push({
        id: replyUser.id,
        name: replyUser.name,
        redCard: action === CommandsNames.red ? 1 : 0,
        yellowCard: action === CommandsNames.yellow ? 1 : 0,
      });
    }

    group.markModified('participants');
    return group.save();
  }

  public async getAllGroupParticipants(groupName): Promise<Participant[]> {
    const group = await this.findByName(groupName);

    return group.participants;
  }
}
