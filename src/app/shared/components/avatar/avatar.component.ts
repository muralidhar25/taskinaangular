import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";



@Component({
    selector: "user-avatar",
    templateUrl: "./avatar.component.html",
    styleUrls: ["./avatar.component.scss"]
})
export class AvatarComponent {

    profile_pic_alt: string;
    profile_pic: string;
    
    @Input()
    className: string;

    get user() {
        return this.user;
    }

    @Input()
    set user(user: any) {
        if (user.first_name && user.last_name) {
            this.profile_pic_alt = user.first_name.substring(0, 1) + user.last_name.substring(0, 1);
            this.profile_pic_alt = this.profile_pic_alt.toUpperCase();
        }
        this.profile_pic = user.profile_pic;
    }

    constructor(
        private route: Router
    ) { }

    ngOnChanges() {
    }


}
