import { Output, Input, EventEmitter } from "@angular/core";
export class ProfileDialog {
  email: string;
  password: string;
  suburb: string;
  firstname: string;
  lastname: string;
  getthingsdone: boolean;
  earnmoney: boolean;
}

export class SkillsDialog {
  skills: Array<string>;
  toDoIt: string;
  name: string;
}
