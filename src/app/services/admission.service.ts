import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AdmissionService {

  public api_admission: string = '';
  frontendBaseUrl:string = 'http://localhost:4200/'

  constructor(private http: HttpClient) {
    this.api_admission = environment.apiUrl;
  }

  //1
  registration(associateId: string, courseId: string): Observable<Object> {
    const admission = { associateId: associateId, courseId: courseId }
    return this.http.post(this.api_admission + `/admission/register/${associateId}/${courseId}`, admission);
  }

  //2
  calculateFees(associateId: String) {
    const admission = { associateId: associateId}
    return this.http.put(this.api_admission + '/admission/calculateFees/' + associateId, admission);
  }

  //3
  addFeedback(regNo: string, feedback: string, feedbackRating: number) {
    const admission = { registrationId: regNo, feedback: feedback, rating: feedbackRating }
    return this.http.post(this.api_admission + `/admission/feedback/${regNo},${feedback},${feedbackRating}`, admission);

  }

  //4
  highestFeeForTheRegisteredCourse(associateId: string) {
    return this.http.get(this.api_admission + `/admission/highestFee/${associateId}`);
  }

  //5
  viewFeedbackByCourseId(courseId: string) {
    return this.http.get(this.api_admission + `/admission/viewFeedbackByCourseId/${courseId}`);
  }

  //6
  viewAllAdmissions(): Observable<any> {
    return this.http.get(this.api_admission + '/admission/viewAll');
  }

  //7
  makePayment(registrationId: string, fees: number): Observable<any> {
    const admission = { registrationId: registrationId,fees:fees }
    return this.http.post(this.api_admission + `/admission/makePayment/${registrationId}/${fees}`, admission);
  }

  //8
  viewByAssociateId(associateId: string): Observable<any> {
    return this.http.get(this.api_admission + '/admission/viewByAssociateId/'+associateId);
  }
}
