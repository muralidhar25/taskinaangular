export class Account {
    first_name:string;
    last_name:string;
    email:string;
    dob?:Date;
    zip_code_id:string;
    tag_line:string;
    about_you:string;
    earn_money:boolean;
    get_things_done:boolean;
    location:string;
    profile_pic:string;
    profile_pic_alt:string;
    profile_pic_present:boolean; 
    description:string;
}
export class Skills {
    do_it_in:string;
    skills:string;
}

export class Badge {

}
export class TaskAlerts {

}
export class Notification {

}
export class Mobile {
contactNo: number;
otp: number
}
export class Password {
    current_password:string;
    new_password:string;
    password_confirmation:string
}

export class Locations {
    loc: string;
    date: string;
    type: string;
    partOfDay: string = null;
    constructor(){
        this.loc = "";
        }
    
  }