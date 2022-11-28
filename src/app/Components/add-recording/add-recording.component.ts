import { Component, OnInit } from "@angular/core";
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Recorder from 'recorder-js';
import { DomSanitizer } from '@angular/platform-browser';

declare var MediaRecorder: any;
const httpOptions = {
  headers: new HttpHeaders({
    'responseType' : 'blob as json',
    'Content-Type':  'application/json',
    'Accept': 'application/json'
  })
};
@Component({
  selector: "add-recording",
  templateUrl: "./add-recording.component.html",
  styleUrls: ['./add-recording.component.css']
})
export class AddRecordingComponent implements OnInit {
  audio;
  copyURL;
  audioBlobUrl;
  blobFile = null;
  recordAudio;
  sendObj = {
    audio: this.blobFile
  };
  audioContext =  new (AudioContext)({sampleRate: 16000});
  recorder = new Recorder(this.audioContext, {});
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) {
    // private audioRecorderService: NgAudioRecorderService
  //   this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
  //     // Handle Error
  // })
  }



  ngOnInit(): void {
    this.recordAudio = () => {
      return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
            const mediaRecorder = new MediaRecorder(stream, {
              mimeType: 'audio/webm',
              numberOfAudioChannels: 1,
              audioBitsPerSecond : 16000,
            });
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
              audioChunks.push(event.data);
            });

            const start = () => {
              mediaRecorder.start();
            };

            const stop = () => {
              return new Promise(resolve => {
                mediaRecorder.addEventListener('stop', () => {
                  const audioBlob = new Blob(audioChunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
                  const reader = new FileReader();
                  reader.readAsDataURL(audioBlob);
                  reader.addEventListener('load', () => {
                    const base64data =  reader.result;
                    this.sendObj.audio = base64data;
                    // this.http.post('apiUrl', this.sendObj, httpOptions).subscribe(data => console.log(data));
                  }, false);
                  const audioUrl = URL.createObjectURL(audioBlob);
                  this.copyURL = audioUrl;
                  console.log('Audiourl', audioUrl);
                  const audio = new Audio(audioUrl);
                  const play = () => {
                    audio.play();
                  };
                  resolve({ audioBlob, audioUrl, play });
                });

                mediaRecorder.stop();
              });
            };
            resolve({ start, stop });
          });
      });
    };
  }
  

//   startRecording() {
//     debugger;
//     alert("start")
//     this.audioRecorderService.startRecording();
    
// }

// stopRecording() {
//      this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
//         // do post output steps
//      }).catch(errrorCase => {
//          // Handle Error
//      });
// }

// hearRecording(){
//   let audio = new Audio();
//   audio.src = "../../../assets/audio/alarm.wav";
//   audio.load();
//   audio.play();
// }
async startPlay() {
  this.recorder = await this.recordAudio();
  this.recorder.start();
}

async stop() {
  debugger;
   this.audio = await this.recorder.stop();
  this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(this.copyURL)
}

async play() {
  
  this.audio.play();
}
async save() {
  
  
}

}
