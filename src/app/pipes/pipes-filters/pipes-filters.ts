import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PipesFiltersPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipesFilters',
})
export class PipesFiltersPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  
  transform(value: any, arg:any):any {
    if (arg === '' || arg.length < 3) return value;
    const resultPost =[];
    for (const post of value) {
     if (post.materia.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPost.push(post)
     }
    }
    return resultPost;
  }
}
