import { 
    Component,
    ViewChild,
    ElementRef,
    OnInit
} from '@angular/core';

@Component({
    selector: 'register',
    styleUrls: ['public/css/register.css'],
    templateUrl: 'public/templates/register.html'
})
export class RegisterComponent implements OnInit { 

    @ViewChild('nameInput') nameInputElem: ElementRef;

    ngOnInit() {
        this.nameInputElem.nativeElement.focus();
    }

}