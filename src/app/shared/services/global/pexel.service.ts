import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { Pexel, PexelResponse } from '../../interfaces/pexel';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PexelService {

  constructor(private http: HttpClient) { }

  searchPhotos({ 
    end_point = 'search', 
    pexel_request = {} }: Pexel = {}): Observable<PexelResponse> {

    let params = new HttpParams();
    let localData = `pexel?${end_point}&`;

    Object.entries(pexel_request).forEach(item => {
      if (item[0]) {
        params = params.set(item[0], item[1]);
        localData += `${item[0]}=${item[1]}&`;
      }
    })

    return sessionStorage.getItem(localData)
      ? of<PexelResponse>(JSON.parse(sessionStorage.getItem(localData) || ''))
      : this.http.get<PexelResponse>(
        `${environment.pexelBaseUrl}/v1/${end_point}/`,
        { params }
      ).pipe(
        map(this.mapPexelResponse),
        tap(resp => sessionStorage.setItem(localData, JSON.stringify(resp)))
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
