import { NgModule } from '@angular/core';
import { TimeAgoPipe } from './time-ago/time-ago';
import { PipesFiltersPipe } from './pipes-filters/pipes-filters';
import { FiltermateriaPipe } from './filtermateria.pipe';
@NgModule({
	declarations: [TimeAgoPipe,
    PipesFiltersPipe,
    FiltermateriaPipe],
	imports: [],
	exports: [TimeAgoPipe,
    PipesFiltersPipe]
})
export class PipesModule {}
