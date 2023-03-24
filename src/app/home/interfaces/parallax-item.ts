import { Type } from '@angular/core';

export interface ParallaxItem {
    title: string;
    subtitle?: string;
    text?: string;
    component: Type<any>;
}