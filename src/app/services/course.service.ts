import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  returnMsg: any = '';
  public api_course: string = '';

  constructor(private http: HttpClient) {
    this.api_course = environment.apiUrl;
  }

  addCourse(course: Course): Observable<Object> {
    return this.http.post(this.api_course + '/course/addCourse', course);
  }
  updateCourse(courseId: string, duration: number): Observable<Object> {
    const course = { courseId: courseId, duration: duration };
    return this.http.put(this.api_course + `/course/update/${courseId}/${duration}`, course);
  }

  viewAllCourses(): Observable<any> {
    return this.http.get(this.api_course + '/course/viewAll');
  }

  disableCourse(courseId: string): Observable<Object> {
    return this.http.delete(this.api_course + '/course/deactivateCourse/' + courseId);
  }
}
