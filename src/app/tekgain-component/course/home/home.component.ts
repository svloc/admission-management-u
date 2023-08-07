import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private courseService: CourseService, private _Activatedroute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.currentUser = localStorage.getItem('roles');
  }
  currentUser: string = '';
  role: string = 'ROLE_ADMIN';
  courses: Array<any> = [];
  cols: any[];
  courseDialog: boolean;
  public addCourseForm: FormGroup;
  isEdit: boolean = false;

  ngOnInit() {
    this.formSetup();
    this.viewAll();
    this.cols = [
      { field: 'courseId', header: 'Course Id' },
      { field: 'courseName', header: 'Course Name' },
      { field: 'fees', header: 'Fees' },
      { field: 'duration', header: 'Duration' },
      { field: 'courseType', header: 'Course Type' },
      { field: 'rating', header: 'Rating' }
    ];
  }

  viewAll(): void {
    this.courseService.viewAllCourses().subscribe(
      (res) => {
        this.courses = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formSetup() {
    this.addCourseForm = this.formBuilder.group({
      courseId: [''],
      courseName: ['', Validators.required],
      fees: [0, [Validators.required, Validators.min(0)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      courseType: ['', Validators.required],
      rating: []
    });
  }

  openNew() {
    this.isEdit = false;
    this.addCourseForm.reset();
    this.courseDialog = true;
  }

  editCourse(courseObj: any) {
    this.isEdit = true;
    this.courseDialog = true;
    this.addCourseForm.setValue(courseObj);
  }

  hideDialog() {
    this.addCourseForm.reset();
    this.courseDialog = false;
    this.isEdit = false;
  }

  deleteCourse(courseObj: Course) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.disableCourse(courseObj.courseId).subscribe(
          (suc) => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.viewAll();
          },
          (error) => {
            Swal.fire(
              'No admissions found for the given course ID.',
              'error'
            )
          }
        )
      }
    })
  }

  addCourse() {
    if (!this.isEdit) {
      if (this.addCourseForm.valid) {
        this.courseService.addCourse(this.addCourseForm.value).subscribe((suc) => {
          Swal.fire('Course Added Successfully', 'success');
          this.hideDialog();
          this.addCourseForm.reset();
          this.viewAll();
        },
          (err) => {
            if (err) {
              Swal.fire(err);
            } else {
              Swal.fire('Oops', 'Something went wrong', 'error');
            }
          }
        );

      }
    } else {
      if (this.addCourseForm.valid) {
        this.courseService.updateCourse(this.addCourseForm.value.courseId, this.addCourseForm.value.duration).subscribe((suc) => {
          Swal.fire('Course Updated Successfully');
          this.addCourseForm.reset();
          this.hideDialog();
          this.viewAll();
        },
          (err) => {
            if (err) {
              Swal.fire(err);
            } else {
              Swal.fire('Oops', 'Something went wrong', 'error');
            }
          }
        );

      }

    }
  }
  access(roles: string[]) {
    return roles.some(x => x == this.currentUser);
  }
}
