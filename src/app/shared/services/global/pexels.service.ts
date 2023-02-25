import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { PexelsRequest, PexelsResponse, ShortPexelsResponse, ShortPhoto } from '../../interfaces/pexels';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {

  constructor(private http: HttpClient) { }

  searchPhotos(pexels: PexelsRequest): Observable<ShortPexelsResponse> {

    let params = new HttpParams();

    Object.entries(pexels).forEach(item => {
      if (item[0]) {
        params = params.set(item[0], item[1]);
      }
    })

    return this.http.get<PexelsResponse>(
      `${environment.pexelsBaseUrl}/v1/search/`,
      { params }
    ).pipe(
      map(this.mapResponseToShortResponse)
    );
  }

  private mapResponseToShortResponse(pexels: PexelsResponse): ShortPexelsResponse {

    return {
      page: pexels.page,
      photos: pexels.photos.map(photo => ({
        id: photo.id,
        photographer: photo.photographer,
        photographer_url: photo.photographer_url,
        avg_color: photo.avg_color,
        src: {
          original: photo.src.original,
          large2x: photo.src.large2x,
          large: photo.src.large,
          medium: photo.src.medium,
          small: photo.src.small,
          portrait: photo.src.portrait,
          landscape: photo.src.landscape,
          tiny: photo.src.tiny,
        },
        alt: photo.alt,
      })),
    };
  }

}
