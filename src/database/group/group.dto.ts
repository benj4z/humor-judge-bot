export type Participant = {
  id: number;
  name: string;
  redCard: number;
  yellowCard: number;
};

export interface GroupDto {
  name: string;
  participants?: Participant[] | [];
}
