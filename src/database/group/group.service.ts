import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from './group.schema';
import { CreateGroupDto } from './group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
  ) {}

  public async createGroup(
    createGroupDto: CreateGroupDto,
  ): Promise<boolean | Group> {
    const group = await this.findByName(createGroupDto.name);

    if (group) {
      return false;
    }

    return new this.groupModel(createGroupDto);
  }

  public findByName(name): Promise<Group> {
    return this.groupModel.findOne({ name: name }).exec();
  }
}
