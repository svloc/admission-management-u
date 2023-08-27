import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssociateService } from 'src/app/services/associate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private associateService: AssociateService,
    private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser = localStorage.getItem('roles');
    this.associateId = localStorage.getItem('associateId');
  }

  associates: Array<any> = [];
  cols: any[];
  associateDialog: boolean;
  public addAssociateForm: FormGroup;
  isEdit: boolean = false;

  associateId: string = '';
  associateName: string = '';
  associateAddress: string = '';
  associateEmailId: string = '';
  currentUser: string = '';
  role: string = 'ROLE_ADMIN';
  errorMessage: string = '';
  ngOnInit() {
    this.formSetup();
    this.viewAll();
    this.cols = [
      { field: 'associateId', header: 'Id' },
      { field: 'associateName', header: 'Name' },
      { field: 'associateAddress', header: 'Address' },
      { field: 'associateEmailId', header: 'EmailId' },
    ];
  }
  viewAll(): void {
    if (this.role == this.currentUser) {
      this.associateService.viewAllAssociates().subscribe(
        (res) => {
          this.associates = res;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.associateService.viewByAssociateId(this.associateId).subscribe(
        (res) => {
          this.associates = [res];
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  formSetup() {
    this.addAssociateForm = this.formBuilder.group({
      associateId: [''],
      associateName: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z ]{3,}$')],
      ],
      associateAddress: ['', Validators.required],
      associateEmailId: ['', [Validators.required, Validators.email]],
    });
  }

  openNew() {
    this.isEdit = false;
    this.addAssociateForm.reset();
    this.associateDialog = true;
  }

  editAssociate(associateObj: any) {
    this.isEdit = true;
    this.associateDialog = true;
    this.addAssociateForm.setValue(associateObj);
  }

  hideDialog() {
    this.addAssociateForm.reset();
    this.associateDialog = false;
    this.isEdit = false;
    this.errorMessage = '';
  }

  addAssociate() {
    if (!this.isEdit) {
      if (this.addAssociateForm.valid) {
        const emailId = this.addAssociateForm.value.associateEmailId;
        const exists = this.associates.some(
          (associate) => associate.associateEmailId === emailId
        );
        if (exists) {
          this.errorMessage = 'Associate ID already exists';
        } else {
          this.associateService
            .addAssociate(this.addAssociateForm.value)
            .subscribe(
              (suc) => {
                Swal.fire({
                  title: 'Success',
                  text: 'Associate added successfully!',
                  icon: 'success',
                  confirmButtonColor: '#832561',
                });
                this.hideDialog();
                this.addAssociateForm.reset();
                this.viewAll();
              },
              (err) => {
                this.errorMessage = err.error;
              }
            );
        }
      }
    } else {
      if (this.addAssociateForm.valid) {
        this.associateService
          .updateAssociate(
            this.addAssociateForm.value.associateId,
            this.addAssociateForm.value.associateAddress
          )
          .subscribe(
            (suc) => {
              Swal.fire({
                title: 'Success',
                text: 'Associate updated successfully!',
                icon: 'success',
                confirmButtonColor: '#832561',
              });
              this.addAssociateForm.reset();
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
