import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  passwordDialog: boolean;
  ngOnInit() {
    this.formSetup();
  }

  products = [
    {
      image: 'learning.svg',
      title: 'Embarking on a Journey of Knowledge',
      description:
        'Unleash your potential through the joy of learning. Every step you take brings you closer to a world of new discoveries.',
    },
    {
      image: 'online_learning.svg',
      title: 'Empowerment Beyond Boundaries',
      description:
        'Seamlessly connect to a universe of education from anywhere, anytime. Embrace the convenience and flexibility of online learning.',
    },
    {
      image: 'road.svg',
      title: 'Charting Your Path to Enlightenment',
      description:
        'Every road you traverse leads to a realm of understanding. Embrace the twists and turns as you navigate the captivating journey to knowledge.',
    },
    {
      image: 'success_factors.svg',
      title: 'Unlocking the Equation to Success',
      description:
        'Success is a symphony of dedication, perseverance, and learning. With knowledge as your guide, you hold the key to achieving remarkable accomplishments.',
    },
    {
      image: 'teaching.svg',
      title: 'Nurturing Minds, Igniting Futures',
      description:
        'In the art of teaching, lives are transformed. Empower others with the gift of knowledge, and witness the bloom of boundless possibilities.',
    },
    {
      image: 'visionary_technology.svg',
      title: 'Pioneering with Visionary Technology',
      description:
        'Forge ahead into the future with technology as your compass. Embrace innovation, and explore the endless horizons of learning and growth.',
    },
  ];
  features = [
    {
      image: 'World-Class-Faculty.png',
      title: 'WORLD-CLASS FACULTY',
      description:
        'Learn from the accomplished teachers with an in-depth understanding of the subject.',
    },
    {
      image: 'Cutting-Edge-Curriculum.png',
      title: 'CUTTING EDGE CURRICULUM',
      description:
        'Educate yourself with the top-notch study material designed by the EXPERTS.',
    },
    {
      image: 'Live-Classes.png',
      title: 'LIVE CLASSES',
      description:
        'Learn concepts, practice questions & get your doubts cleared instantly in the LIVE Classes.',
    },
    {
      image: 'Student-Discussion-Forum.png',
      title: 'STUDENT DISCUSSION FORUM',
      description:
        'Get access to 24*7 Live Discussion group with batchmates & faculties.',
    },
    {
      image: 'Quiz-&-Assignments.png',
      title: 'QUIZ & ASSIGNMENTS',
      description:
        'Practice chapter-wise Quizzes & solve Assignments to learn and revise concepts.',
    },
    {
      image: 'Video-Lectures.png',
      title: 'VIDEO LECTURES',
      description:
        'Learn through high-quality & easy to understand video lectures.',
    },
    {
      image: 'E-books.png',
      title: 'E-BOOKS',
      description:
        'Get Important topics & formulas for last-minute revision in the PDF format.',
    },
    {
      image: 'notification.png',
      title: 'ALERT & NOTIFICATION',
      description:
        'Stay up to date & get notified every time the course content is updated.',
    },
    {
      image: 'Trusted-Content.png',
      title: 'TRUSTED CONTENT',
      description: 'Learn from the comprehensive & interactive course content.',
    },
    {
      image: 'Affordable-Fee-Structure.png',
      title: 'AFFORDABLE FEE STRUCTURE',
      description:
        'Learn from the best in the industry with an affordable payment plan.',
    },
    {
      image: 'Online-&-Offline-Video-lectures.png',
      title: 'ONLINE & OFFLINE VIDEO LECTURES',
      description:
        'Learn even when you are offline through our in-app video lectures.',
    },
    {
      image: 'Learn-Anytime-Anywhere.png',
      title: 'LEARN ANYTIME ANYWHERE',
      description:
        'Learn at your own pace through our easy to navigate Responsive Website.',
    },
  ];

  menuItems: any[];
  public changePasswordForm: FormGroup;
  associateId: string = '';
  formSetup() {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: passwordMatchValidator }
    );
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      this.authService
        .changePassword(
          this.changePasswordForm.value.password,
          this.associateId
        )
        .subscribe(
          (suc) => {
            if (suc) {
              Swal.fire({
                title: 'Success',
                text: 'Password Changes successfully!',
                icon: 'success',
                confirmButtonColor: '#832561',
              });
              this.changePasswordForm.reset();
              this.hideDialog();
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonColor: '#832561',
              });
            }
          },
          (err) => {
            if (err.status == 401) {
              Swal.fire({
                title: 'Error',
                text: 'Invalid username/Password',
                icon: 'error',
                confirmButtonColor: '#832561',
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonColor: '#832561',
              });
            }
          }
        );
    }
  }

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.isDashboardRoute();
    this.associateId = localStorage.getItem('associateId');
    this.menuItems = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
      {
        label: 'Change Password',
        icon: 'pi pi-key',
        command: () => {
          this.openNew();
        },
      },
    ];
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#832561',
      cancelButtonColor: '#11862f',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel', // Added cancel button text
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been logged out.',
          icon: 'success',
          confirmButtonColor: '#832561',
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isLoggedIn');
        this.router.navigate(['/']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Added handling for cancel action
        Swal.fire({
          title: 'Cancelled',
          text: 'Logout operation was cancelled.',
          icon: 'error',
          confirmButtonColor: '#832561',
        });
      }
    });
  }

  isDashboardRoute(): boolean {
    return this.activeRoute.snapshot.data.isDashboard === true;
  }

  openNew() {
    this.passwordDialog = true;
  }
  hideDialog() {
    this.changePasswordForm.reset();
    this.passwordDialog = false;
  }
}

function passwordMatchValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
}
