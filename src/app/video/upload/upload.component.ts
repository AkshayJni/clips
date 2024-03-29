import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { last } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  isDragOver: boolean = false;
  file: File | null = null;
  nextStep: boolean = false;
  showAlert: boolean = false;
  alertColor: string = 'blue';
  alertMsg: string = 'Please wait! Your clip is being uploaded...';
  inSubmission: boolean = false;
  percentage: number = 0;
  showPercentage: boolean = false;

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  uploadForm = new FormGroup({
    title: this.title
  });

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  storeFile(event: Event) {
    this.isDragOver = false;
    this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  uploadFile() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uploaded...';
    this.inSubmission = true;
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    const task = this.storage.upload(clipPath, this.file);

    task.percentageChanges().subscribe(progress => {
      this.percentage = (progress as number) / 100;
    });

    task.snapshotChanges().pipe(
      last()
    ).subscribe({
      next: (snapShot) => {
        this.alertColor = 'green';
        this.alertMsg = 'Success! Your clip is now ready.';
        this.showPercentage = false;
        console.log(snapShot);
      },
      error: (error) => {
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again later.';
        this.inSubmission = true;
        this.showPercentage = false;
        console.log(error);
      }
    });
  }
}
