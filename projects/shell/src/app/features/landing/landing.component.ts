import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'growup-landing',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
    ],
    templateUrl: './landing.component.html',
    styles: []
})
export class LandingComponent { }
