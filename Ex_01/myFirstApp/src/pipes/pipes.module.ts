import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { GetUserTagPipe } from './get-user-tag/get-user-tag';
import { DescriptionPipe } from './description/description';
@NgModule({
	declarations: [ThumbnailPipe,
    GetUserTagPipe,
    DescriptionPipe],
	imports: [],
	exports: [ThumbnailPipe,
    GetUserTagPipe,
    DescriptionPipe]
})
export class PipesModule {}
