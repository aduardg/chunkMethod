import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.css']
})
export class LoadFileComponent implements OnInit {
  //@ts-ignore
  myFile:File;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  async onClickUpload(){
    let CountChunk = this.myFile.size;
    let index:number = 0;
    console.log(index.toString());
    for(let offset = 0; offset < CountChunk; offset+=20000000){
      if(offset+20000000 < CountChunk){
        let data:FormData = new FormData();
        console.log(this.myFile.slice());
        data.append('file',this.myFile.slice(offset, offset+20000000));
        data.append('numberChunk',index.toString());

        const Resp = await this.http.post('https://localhost:44393/api/Chunk/UploadFile',data).toPromise();        
        console.log(Resp);
      }

      else{
        let data:FormData = new FormData();
        console.log(this.myFile.slice());
        data.append('file',this.myFile.slice(offset, CountChunk));
        data.append('numberChunk',index.toString());

        const Resp = await this.http.post('https://localhost:44393/api/Chunk/UploadFile',data).toPromise();
        console.log(Resp);
      }
      index++;
      console.log(offset);
      console.log(CountChunk);
    }


    
  }

  onFileChanged(event:any){
    this.myFile = event.target.files[0];
    console.log(this.myFile);
  }

}
