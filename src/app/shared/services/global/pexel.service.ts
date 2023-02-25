import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PexelRequest, PexelResponse } from '../../interfaces/pexel';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PexelService {

  constructor(private http: HttpClient) { }

  searchPhotos(pexels: PexelRequest): Observable<PexelResponse> {

    let params = new HttpParams();

    Object.entries(pexels).forEach(item => {
      if (item[0]) {
        params = params.set(item[0], item[1]);
      }
    })

    return this.http.get<PexelResponse>(
      `${environment.pexelBaseUrl}/v1/search/`,
      { params }
    ).pipe(
      map(this.mapPexelResponse)
    );
  }

  private mapPexelResponse(response: PexelResponse): PexelResponse {
    const { page, photos } = response;
    const mappedPhotos = photos.map(({ id, photographer, photographer_url, avg_color, src, alt }) => ({
      id,
      photographer,
      photographer_url,
      avg_color,
      src,
      alt
    }));
    return { page, photos: mappedPhotos };
  }
}
