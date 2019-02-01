import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { GetUserTagPipe } from './get-user-tag/get-user-tag';
@NgModule({
	declarations: [ThumbnailPipe,
    GetUserTagPipe],
	imports: [],
	exports: [ThumbnailPipe,
    GetUserTagPipe]
})
export class PipesModule {}
