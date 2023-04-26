import { Pipe, PipeTransform } from '@angular/core';
import { Tournament } from '../interfaces/tournament.interface';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(tournament: Tournament): String {
    return `../../../../assets/images/${ tournament.image }.png`;
  }
}
