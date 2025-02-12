import { Component, OnInit,  ElementRef, Output, EventEmitter } from '@angular/core';
import { Store } from '../../../model/store';
import { Network } from '../../../model/Network';
@Component({
  selector: 'app-create-front',
  templateUrl: './create-front.component.html',
  styleUrls: ['./create-front.component.css']
})
export class CreateFrontComponent implements OnInit {
  BUCKET_URL:string=Network.BUCKET_URL;
  store:Store=new Store();
  name:string;
  summary:string;
  video:string;

  logo:boolean=false;
  banner:boolean=false;

  /********************** VARIABLES HID *************************/
  hidCreateStoreName:boolean=true;
  hidCreateStoreSummary:boolean=true;
  hidCreateStoreLogo:boolean=true;
  hidCreateStoreBanner:boolean=true;

  @Output() setStore = new EventEmitter();
  constructor(private elem:ElementRef) { 
    
  }
  ngOnInit() {
    
  }
  sendFront(){
    if(this.validarCreateStore()){
      this.uploadImage();
      this.store.name=this.name;
      this.store.summary=this.summary;
      this.store.video=this.video;
    }
  }

  validarCreateStore(){
    this.resetHidCreateStore();
    if(this.name==null || this.name==""){
      this.hidCreateStoreName=false;
      return false;
    }else if(this.summary==null || this.summary==""){
      this.hidCreateStoreSummary=false;
      return false;
    }else if(this.logo==false){
      this.hidCreateStoreLogo=false;
      return false;
    }else if(this.banner==false){
      this.hidCreateStoreBanner=false;
      return false;
    }else{
      return true;
    }
  }

  resetHidCreateStore(){
    this.hidCreateStoreName=true;
    this.hidCreateStoreSummary=true;
    this.hidCreateStoreLogo=true;
    this.hidCreateStoreBanner=true;
  }

  public uploadImage(){
    let files = this.elem.nativeElement.querySelector('#image-upload1').files;
    let file = files[0];
    let files2 = this.elem.nativeElement.querySelector('#image-upload2').files;
    let file2 = files2[0];
    if(file!=null){
      this.getBase64(file).then(
        data => this.setImagePrincipal(data)
      );
    }
    else{
      this.store.mainImage="sin";
    }
    if(file2!=null){
      this.getBase64(file2).then(
        data => this.setImage(data)
      );
    }else{
      this.store.bannerImage="sin";
    } 

    this.setStore.emit(this.store);
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  setImagePrincipal(data:object){
    this.store.mainImage=JSON.stringify(data);
    this.store.mainImage=this.store.mainImage.replace(/['"]+/g, '');
  }
  setImage(data:object){
    this.store.bannerImage=JSON.stringify(data);
    this.store.bannerImage=this.store.bannerImage.replace(/['"]+/g, '');
  }
  keyPressCP(event: any){
    const pattern = /[a-z\A-Z]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
  }

  verifLogo(valor:any){
    if(valor!=null){
      this.logo=true;
    }
  }

  verifBanner(valor:any){
    if(valor!=null){
      this.banner=true;
    }
  }
}
