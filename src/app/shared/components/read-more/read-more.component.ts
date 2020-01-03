import { Component, Input } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';


@Component({
    selector: 'read-more',
    templateUrl: "./read-more.component.html",
})

export class ReadMoreComponent {
    
    @Input() content: string;
    @Input() length: number;
    @Input() isCollapsed: boolean;
    linkTitle: string;

    detail: string;

    ngOnChanges() {
        this.isCollapsed = false;
        this.toggle();
    }

    ngOnInit() {
        
    }

    toggle() {
        this.isCollapsed = !this.isCollapsed;
        this.content = this.content.replace(/\n/g, '<br>');

        if(this.length > this.content.length) {
            this.detail = this.content;
            this.linkTitle = "";

        } else {
            if(this.isCollapsed) {
                this.detail = this.content.substr(0,this.length);
                this.linkTitle = "More";
            } else {
                this.detail = this.content;
                this.linkTitle = "Less";
            }
        }

    }
}