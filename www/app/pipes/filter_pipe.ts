import {Pipe, PipeTransform, Injectable} from 'angular2/angular2';
import {Share} from '../share/share';

@Pipe({name: 'filter'})
@Injectable()
export class FilterPipe implements PipeTransform {
  public transform(value: Share[], args: any[]): Share[] {
    let property: string;
    let match: string;
    [property, match] = args[0];

    return value.filter((x: Share) => x[property] === match);
  }
}
