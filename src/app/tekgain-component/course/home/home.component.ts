import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.currentUser = localStorage.getItem('roles');
  }
  currentUser: string = '';
  role: string = 'ROLE_ADMIN';
  courses: Array<any> = [];
  cols: any[];
  courseDialog: boolean;
  public addCourseForm: FormGroup;
  isEdit: boolean = false;

  bgImages: string[] = ["Hexagon.svg", "massCircles.svg", "waveLine.svg", "soundWave.svg", "opticalFiber.svg", "stockChart.svg","circuitBoard.svg",];

  ngOnInit() {
    this.formSetup();
    this.viewAll();
    this.cols = [
      { field: 'courseId', header: 'Course Id' },
      { field: 'courseName', header: 'Course Name' },
      { field: 'fees', header: 'Fees' },
      { field: 'duration', header: 'Duration' },
      { field: 'courseType', header: 'Course Type' },
      { field: 'rating', header: 'Rating' },
    ];
  }
  isTableView: boolean = true;

  switchToTableView() {
    this.isTableView = true;
  }

  switchToCardListView() {
    this.isTableView = false;
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
      rating: [],
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
      confirmButtonColor: '#832561',
      cancelButtonColor: '#11862f',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel', // Added cancel button text
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.disableCourse(courseObj.courseId).subscribe(
          (suc) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your Course has been deleted.',
              icon: 'success',
              confirmButtonColor: '#832561',
            });
            this.viewAll();
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No admissions found for the given course ID.',
              icon: 'error',
              confirmButtonColor: '#832561',
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancel action
        Swal.fire({
          title: 'Cancelled',
          text: 'Course deletion was cancelled.',
          icon: 'error',
          confirmButtonColor: '#832561',
        });
      }
    });
  }

  addCourse() {
    if (!this.isEdit) {
      if (this.addCourseForm.valid) {
        this.courseService.addCourse(this.addCourseForm.value).subscribe(
          (suc) => {
            Swal.fire({
              title: 'Success',
              text: 'Course added successfully!',
              icon: 'success',
              confirmButtonColor: '#832561',
            });
            this.hideDialog();
            this.addCourseForm.reset();
            this.viewAll();
          },
          (err) => {
            if (err) {
              Swal.fire({
                title: 'Error',
                text: err.error,
                icon: 'error',
                confirmButtonColor: '#832561',
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Oops, something went wrong',
                icon: 'error',
                confirmButtonColor: '#832561',
              });
            }
          }
        );
      }
    } else {
      if (this.addCourseForm.valid) {
        this.courseService
          .updateCourse(
            this.addCourseForm.value.courseId,
            this.addCourseForm.value.duration
          )
          .subscribe(
            (suc) => {
              Swal.fire({
                title: 'Success',
                text: 'Course updated successfully!',
                icon: 'success',
                confirmButtonColor: '#832561',
              });
              this.addCourseForm.reset();
              this.hideDialog();
              this.viewAll();
            },
            (err) => {
              if (err) {
                Swal.fire({
                  title: 'Error',
                  text: err.error,
                  icon: 'error',
                  confirmButtonColor: '#832561',
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'Oops, something went wrong',
                  icon: 'error',
                  confirmButtonColor: '#832561',
                });
              }
            }
          );
      }
    }
  }
  
  access(roles: string[]) {
    return roles.some((x) => x == this.currentUser);
  }
}
