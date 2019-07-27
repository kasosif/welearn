import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressComponent } from './progress/progress.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {AjoutFormationComponent} from './ajout-formation/ajout-formation.component';
import { PartieFormationAjoutComponent } from './partie-formation-ajout/partie-formation-ajout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UiProgressbarsComponent} from './ui-progressbars/ui-progressbars.component';


@NgModule({
	declarations: [BlogPostComponent, BlogListComponent, BlogDetailsComponent,
		FileUploadComponent, ProgressComponent, AjoutFormationComponent, PartieFormationAjoutComponent, UiProgressbarsComponent],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		NgxEchartsModule,
		RichTextEditorAllModule,
		NgMultiSelectDropDownModule,
		NgbModule
	]
})
export class BlogsModule { }