
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  public api_associate: string = '';

  constructor(private http: HttpClient) {
    this.api_associate = environment.apiUrl;
  }

  addAssociate(associate: Object): Observable<Object> {
    return this.http.post(this.api_associate + '/associate/addAssociate', associate);
  }

  updateAssociate(associateId: string, associateAddress: string): Observable<Object> {
    const associate = { associateId: associateId, associateAddress: associateAddress };
    return this.http.put(this.api_associate + `/associate/updateAssociate/${associateId}/${associateAddress}`, associate);
  }

  viewAllAssociates(): Observable<any> {
    return this.http.get(this.api_associate + '/associate/viewAll');
  }

  viewByAssociateId(associateId: string): Observable<any> {
    return this.http.get(this.api_associate + '/associate/viewByAssociateId/'+associateId);
  }

}
