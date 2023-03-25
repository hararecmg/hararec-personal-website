import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// Forms
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { ToggleButtonModule } from 'primeng/togglebutton';
// Buttons
import { ButtonModule } from 'primeng/button';
// Data
import { PaginatorModule } from 'primeng/paginator';
import { TimelineModule } from 'primeng/timeline';
import { TreeModule } from 'primeng/tree';
// Panel
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
// Overlay
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
// Menu
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
// Messages
import { ToastModule } from 'primeng/toast';
// Media
import { GalleriaModule } from 'primeng/galleria';
// Misc
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
// Directives
import { AnimateModule } from 'primeng/animate';




@NgModule({
  exports: [
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    RatingModule,
    ToggleButtonModule,
    ButtonModule,
    PaginatorModule,
    TimelineModule,
    TreeModule,
    CardModule,
    ToolbarModule,
    DialogModule,
    DynamicDialogModule,
    SidebarModule,
    TooltipModule,
    MenubarModule,
    PanelMenuModule,
    ToastModule,
    GalleriaModule,
    AvatarModule,
    AvatarGroupModule,
    ChipModule,
    ScrollTopModule,
    SkeletonModule,
    AnimateModule,
  ],
})
export class PrimengModule { }
