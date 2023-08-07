import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  ngOnInit() {
    
  }


  products = [
    {
      image: "learning.svg",
      title: "Embarking on a Journey of Knowledge",
      description: "Unleash your potential through the joy of learning. Every step you take brings you closer to a world of new discoveries."
    },
    {
      image: "online_learning.svg",
      title: "Empowerment Beyond Boundaries",
      description: "Seamlessly connect to a universe of education from anywhere, anytime. Embrace the convenience and flexibility of online learning."
    },
    {
      image: "road.svg",
      title: "Charting Your Path to Enlightenment",
      description: "Every road you traverse leads to a realm of understanding. Embrace the twists and turns as you navigate the captivating journey to knowledge."
    },
    {
      image: "success_factors.svg",
      title: "Unlocking the Equation to Success",
      description: "Success is a symphony of dedication, perseverance, and learning. With knowledge as your guide, you hold the key to achieving remarkable accomplishments."
    },
    {
      image: "teaching.svg",
      title: "Nurturing Minds, Igniting Futures",
      description: "In the art of teaching, lives are transformed. Empower others with the gift of knowledge, and witness the bloom of boundless possibilities."
    },
    {
      image: "visionary_technology.svg",
      title: "Pioneering with Visionary Technology",
      description: "Forge ahead into the future with technology as your compass. Embrace innovation, and explore the endless horizons of learning and growth."
    },


  ];
  features = [
    {
      image: 'World-Class-Faculty.png', 
      title: 'WORLD-CLASS FACULTY',
      description: 'Learn from the accomplished teachers with an in-depth understanding of the subject.'
    },
    {
      image: 'Cutting-Edge-Curriculum.png',
      title: 'CUTTING EDGE CURRICULUM',
      description: 'Educate yourself with the top-notch study material designed by the EXPERTS.'
    },
    {
      image: 'Live-Classes.png',
      title: 'LIVE CLASSES',
      description: 'Learn concepts, practice questions & get your doubts cleared instantly in the LIVE Classes.'
    },
    {
      image: 'Student-Discussion-Forum.png',
      title: 'STUDENT DISCUSSION FORUM',
      description: 'Get access to 24*7 Live Discussion group with batchmates & faculties.'
    },
    {
      image: 'Quiz-&-Assignments.png',
      title: 'QUIZ & ASSIGNMENTS',
      description: 'Practice chapter-wise Quizzes & solve Assignments to learn and revise concepts.'
    },
    {
      image: 'Video-Lectures.png',
      title: 'VIDEO LECTURES',
      description: 'Learn through high-quality & easy to understand video lectures.'
    },
    {
      image: 'E-books.png',
      title: 'E-BOOKS',
      description: 'Get Important topics & formulas for last-minute revision in the PDF format.'
    },
    {
      image: 'notification.png',
      title: 'ALERT & NOTIFICATION',
      description: 'Stay up to date & get notified every time the course content is updated.'
    },
    {
      image: 'Trusted-Content.png',
      title: 'TRUSTED CONTENT',
      description: 'Learn from the comprehensive & interactive course content.'
    },
    {
      image: 'Affordable-Fee-Structure.png',
      title: 'AFFORDABLE FEE STRUCTURE',
      description: 'Learn from the best in the industry with an affordable payment plan.'
    },
    {
      image: 'Online-&-Offline-Video-lectures.png',
      title: 'ONLINE & OFFLINE VIDEO LECTURES',
      description: 'Learn even when you are offline through our in-app video lectures.'
    },
    {
      image: 'Learn-Anytime-Anywhere.png',
      title: 'LEARN ANYTIME ANYWHERE',
      description: 'Learn at your own pace through our easy to navigate Responsive Website.'
    }
  ];
  
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.isDashboardRoute();
  }
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    Swal.fire('Logout Success', 'success');
    this.router.navigate(['/']);
  }

  isDashboardRoute(): boolean {
    return this.activeRoute.snapshot.data.isDashboard === true;
  }


}
