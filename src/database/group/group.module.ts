import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  ],
  providers: [GroupService],
  exports: [GroupService, MongooseModule],
})
export class GroupModule {}
