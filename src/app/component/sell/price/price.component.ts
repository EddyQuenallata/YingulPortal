import { Component, OnInit, Output,Input, EventEmitter, ElementRef } from '@angular/core';
import {Observable}  from 'rxjs/Observable';
import { SellService } from '../../../service/sell.service'
import { Service } from '../../../model/service';
import { Province } from '../../../model/province';
import { City } from '../../../model/city';
import { Barrio } from '../../../model/barrio';
import { user } from '../../../model/user';

import { Product } from '../../../model/product';
import { Property } from '../../../model/Property';
import { Motorized } from '../../../model/Motorized';
import { Ubication } from '../../../model/ubication';
import { Country } from '../../../model/country';
import { BuyService } from '../../../service/buy.service';
import { StandarCostAndreani } from '../../../model/standar-cost-andreani';
import { Person } from '../../../model/person';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  @Output() Back = new EventEmitter();
  @Output() priceItemS = new EventEmitter();

  @Input()  typeCatPre:any;
  @Input('productTem') productTem:Product =new Product();
  countryList:Country[];
  provinceList: Object[];
  cityList: Object[];
  barrioList : Object[];
  cityHid:boolean;
  barrioHid:boolean;
  //datos del formulario
  phone:string="";
  phone2:string="";
  email:string="";
  webSite:string="";
  price:number;
  money:string="ARS";
  public cobertureZone:Object[]=[];
  street:string="";
  number:string="";
  postalCode:string="";
  aditional:string="";
  documentNumber:string="";
  documentType:string="DNI";
  telephone:string="";
  User:object;
  userName;
  ubicationId:string;

  priceDiscount1:boolean;

  //objeto final para enviar
  public service:Service = new Service();
  public product:Product = new Product();
  public property:Property = new Property();
  public motorized:Motorized =new Motorized();
  //
  country:Country= new Country();
  public province:Province = new Province();
  public city:City = new City();
  public barrio:Barrio = new Barrio();
  checkRPerson:boolean=false;
  disabledRPerson:boolean=false;
  public popupDescuento:boolean=true;
  checkedDiscount:boolean=false;
  priceDiscount:number;
  priceNormal:number;
  countryName:string;
  countryHidden:boolean=false;
  countryTemp:Country=new Country();
  department:string="";
  withinStreets:string="";
  popPriUb:boolean=false;
  booleanPerson:boolean=false;
  useri:user=new user();
  userNameP:string;
  Usertemp:user=new user();
  msg:string;
  cityTem:City =new City();
  standardCost:StandarCostAndreani=new StandarCostAndreani();
  listStandardCost:Object[];
  precioEnvio:number;

  /****************************VARIABLE G*****************************/
  prodPayMethod:string="0";
  prodFormDeliv:boolean=false;
  maxDocumentNumber:number=8;
  /****************** VARIABLES VALIDACION SERVICIOS *******************/
  hidPhone:boolean=true;
  hidPrice:boolean=true;
  hidPriceExedido:boolean=true;
  hidCountry:boolean=true;
  hidProvince:boolean=true;
  hidCity:boolean=true;
  hidStreet:boolean=true;
  hidNumber:boolean=true;
  popup_g:boolean=true;

  hidProductSalesCondition:boolean=true;
  hidProductPaymentMethod:boolean=true;
  hidYingulExpress:boolean=true;
  hidIngresarDomicilio:boolean=true;

  hidUbicationCountry:boolean=true;
  hidUbicationProvince:boolean=true;
  hidUbicationCity:boolean=true;
  hidUbicationStreet:boolean=true;
  hidUbicationNumber:boolean=true;
  hidUbicationPhone:boolean=true;
  hidUbicationDni:boolean=true;
  hidUbicationAditional:boolean=true;

  typePay:boolean=false;
  

  checkInter:boolean=true;
  disabledInter:boolean=true;


  constructor(private elem:ElementRef,private buyService: BuyService,private sellService: SellService) { 

    this.cityHid=true;
    this.barrioHid=true;
  }

  ngOnInit() {
    this.product.productPagoEnvio="gratis";
    this.sellService.getCountries().subscribe(
			res => {
        		this.countryList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
      		},
      		error => console.log(error)
    );
    this.sellService.getUser().subscribe(
      res => {
        this.User = JSON.parse(JSON.parse(JSON.stringify(res))._body);
        this.phone=JSON.stringify(JSON.parse(JSON.stringify(this.User)).phone);
        this.phone=this.phone.replace(/['"]+/g, '');
        if(this.phone=="null"){this.phone="";}
        this.phone2=JSON.stringify(JSON.parse(JSON.stringify(this.User)).phone2);
        this.phone2=this.phone2.replace(/['"]+/g, '');
        if(this.phone2=="null"){this.phone2="";}
        this.webSite=JSON.stringify(JSON.parse(JSON.stringify(this.User)).webSite);
        this.webSite=this.webSite.replace(/['"]+/g, '');
        if(this.webSite=="null"){this.webSite="";}
        this.userName=JSON.stringify(JSON.parse(JSON.stringify(this.User)).username);
        this.userName=this.userName.replace(/['"]+/g,'');
        //his.ubicationId=JSON.stringify(JSON.parse(JSON.stringify(this.User)).yng_Ubication.);
       // this.ubicationId=this.ubicationId.replace(/['"]+/g,'');
       // alert("userNameprice :"+this.ubicationId);


      },
      error => console.log(error)
    );
   
    this.useri=JSON.parse(localStorage.getItem("user"));
    this.userNameP=this.useri.username;
    console.log("userNameP:"+this.userNameP);
    this.sellService.ConsultarUbicavionUser(this.userNameP).subscribe(
      res => {
        console.log("res:"+JSON.stringify(res));
        if(JSON.parse(JSON.stringify(res))._body==""){
            //this.ubication = JSON.parse(JSON.parse(JSON.stringify(res))._body);
          this.popPriUb=true;
        }
        else {
          this.popPriUb=false;
        }
          },
          error => console.log(error)
    );
    this.sellService.standardCostAndreani().subscribe(
      res => {
          this.listStandardCost=JSON.parse(JSON.parse(JSON.stringify(res))._body);
          console.log("this.listStandardCost:"+JSON.stringify(this.listStandardCost));
          },
          error => console.log(error)
    );
    
  }
  provin:string;
  getProvince(countryId:number){
    this.country.countryId=countryId;
    this.provinceList=null;
    this.cityHid=true;
    this.barrioHid=true;
    this.sellService.getProvinces(countryId).subscribe(
			res => {
            this.provinceList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            //this.provin=JSON.stringify(JSON.parse(JSON.stringify(this.cityList)).provinceId);

      		},
      		error => console.log(error)
    );
  }
  getCity(provinceId : number){
   this.province.provinceId=provinceId;
    this.cityList=[];
    this.sellService.getCities(provinceId).subscribe(
			res => {
            this.cityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.provin=JSON.stringify(JSON.parse(JSON.stringify(this.cityList)).provinceId);
           // alert("this.provin:"+this.provin);
            if(JSON.stringify(this.cityList)=="[]"){
              this.cityHid=true;
              this.barrioHid=true;
            } 
            else{
              this.cityHid=false;
            }
      		},
      		error => console.log(error)
    );
  }
  getBarrio(cityId : number){
    this.city.cityId=cityId;
    this.barrioList=[];
    console.log("cityId:"+cityId);
    var ret="";
    for(let c of this.cityList){
      this.cityTem=JSON.parse(JSON.stringify(c));
      if(cityId==this.cityTem.cityId){ 
        ret=this.cityTem.codigopostal;
      }
    }
    console.log("ret:"+ret);
    this.postalCode=ret;
    this.sellService.getBarrio(cityId).subscribe(
			res => {
            this.barrioList = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            if(JSON.stringify(this.barrioList)=="[]"){
              this.barrioHid=true;
            }
            else{
              this.barrioHid=false;
            }
      		},
      		error => console.log(error)
    );
  }
  setBarrio(barrioId:number){
    this.barrio.barrioId=barrioId;
  }
  zonaServ():boolean{
    if(this.typeCatPre=="Service")      return true;
    else                                return false;
  }
  isProduct():boolean{
    if(this.typeCatPre=="Product")      return true;
    else                                return false;
  }
  isOtro():boolean{
    if(this.typeCatPre!="Product")      return true;
    else                                return false;
  }
  isPropertyMotorized():boolean{
    if(this.typeCatPre=="Motorized" || this.typeCatPre=="Property")      return true;
    else                                return false;
  }
  
  resetProduct(){
    this.hidPrice=true;
    this.hidProductSalesCondition=true;
    this.hidProductPaymentMethod=true;
    this.hidYingulExpress=true;
    this.hidIngresarDomicilio=true;
    this.hidPriceExedido=true;
  }

  validarProducto(){
    this.resetProduct();
    if(this.price==null || this.price==0){
      this.hidPrice=false;
      this.elem.nativeElement.querySelector('#price').focus();
      return false;
    }else if(this.productSaleConditions==null || this.productSaleConditions=="0"){
      this.hidProductSalesCondition=false;
      this.elem.nativeElement.querySelector('#condition').focus();
      return false;
    }else if(this.prodPayMethod==null || this.prodPayMethod=="0"){
      this.hidProductPaymentMethod=false;
      this.elem.nativeElement.querySelector('#payMethod').focus();
      return false;
    }else if(this.prodFormDeliv==false){
      this.hidYingulExpress=false;
      //this.elem.nativeElement.querySelector('#yingulExpress').focus();
      return false;
    }else if(this.popupUbicacion==false){
      this.hidIngresarDomicilio=false;
      //this.elem.nativeElement.querySelector('#number').focus();
      return false;
    }else if(this.product.productPagoEnvio=="comprador" && this.price>29900){
      this.hidPriceExedido=false;
      this.elem.nativeElement.querySelector('#price').focus();
      return false;
    }else{
      return true;
    }
  }

  validarInmueble(){
    this.resetService();
    if(this.phone==null || this.phone==""){
      this.hidPhone=false;
      this.elem.nativeElement.querySelector('#phone').focus();
      return false;
    }else if(this.price==null || this.price==0){
      this.hidPrice=false;
      this.elem.nativeElement.querySelector('#price').focus();
      return false;
    }else if(this.country.countryId==null || this.country.countryId==0){
      this.hidCountry=false;
      this.elem.nativeElement.querySelector('#country').focus();
      return false;
    }else if(this.province.provinceId==null || this.province.provinceId==0){
      this.hidProvince=false;
      this.elem.nativeElement.querySelector('#province').focus();
      return false;
    }else if(this.city.cityId==null || this.city.cityId==0){
      this.hidCity=false;
      this.elem.nativeElement.querySelector('#city').focus();
      return false;
    }else if(this.street==null || this.street==""){
      this.hidStreet=false;
      this.elem.nativeElement.querySelector('#street').focus();
      return false;
    }else if(this.number==null || this.number==""){
      this.hidNumber=false;
      this.elem.nativeElement.querySelector('#number').focus();
      return false;
    }else{
      return true;
    }
  }

  sendPrice(){
    console.log("type price  pre: "+this.typeCatPre)
    if(this.typeCatPre=="Service"){
      this.resetService();
      if(this.phone==null || this.phone==""){
        this.hidPhone=false;
        this.elem.nativeElement.querySelector('#phone').focus();
      }else if(this.typePay==true && (this.price==null || this.price==0)){
        this.hidPrice=false;
        this.elem.nativeElement.querySelector('#price').focus();
      }else if(this.country.countryId==null || this.country.countryId==0){
        this.hidCountry=false;
        this.elem.nativeElement.querySelector('#country').focus();
      }else if(this.province.provinceId==null || this.province.provinceId==0){
        this.hidProvince=false;
        this.elem.nativeElement.querySelector('#province').focus();
      }else if(this.city.cityId==null || this.city.cityId==0){
        this.hidCity=false;
        this.elem.nativeElement.querySelector('#city').focus();
      }else if(this.street==null || this.street==""){
        this.hidStreet=false;
        this.elem.nativeElement.querySelector('#street').focus();
      }else if(this.number==null || this.number==""){
        this.hidNumber=false;
        this.elem.nativeElement.querySelector('#number').focus();
      }
      else{
        this.resetService();
        this.service.yng_Item.user.phone=this.phone;
        this.service.yng_Item.user.phone2=this.phone2;
        this.service.emailService=this.email;
        this.service.yng_Item.user.webSite=this.webSite;
        this.service.yng_Item.price=this.price;
        this.service.yng_Item.money=this.money;
        this.service.yng_Item.yng_Ubication.street=this.street;
        this.service.yng_Item.yng_Ubication.number=this.number;
        this.service.yng_Item.yng_Ubication.postalCode= this.postalCode;
        this.service.yng_Item.yng_Ubication.aditional=this.aditional;
        this.service.yng_Item.yng_Ubication.yng_Country=this.country;
        this.service.yng_Item.yng_Ubication.yng_Province=this.province;
        this.service.yng_Item.yng_Ubication.yng_City=this.city;
        this.service.yng_Item.yng_Ubication.yng_Barrio=this.barrio;
        //sise cobra publicidad por producto destacado aqui
        //this.service.yng_Item.isOver=false;
        this.service.cobertureZone=this.cobertureZone;
        this.priceItemS.emit(this.service);
      }
    }
    if(this.typeCatPre=="Product"){
      if(this.validarProducto()){
        this.resetProduct();
        this.product.yng_Item.user.phone=this.phone;
        this.product.yng_Item.user.phone2=this.phone2;
        //this.product.$emailService=this.email;
        this.product.yng_Item.user.webSite=this.webSite;
        this.product.yng_Item.price=this.price;
        this.product.yng_Item.money="ARS";      
        //this.product.
        //this.product.$cobertureZone=this.cobertureZone;
        this.product.productPaymentMethod=this.productPaymentMethod;
        this.product.productSaleConditions=this.productSaleConditions;
        
        //this.product.$productFormDelivery=
        this.priceItemS.emit(this.product);
      }
    }
    if(this.typeCatPre=="Property"){
      if(this.validarInmueble()){
        this.property.yng_Item.user.phone=this.phone;
        this.property.yng_Item.user.phone2=this.phone2;
        //this.product.$emailService=this.email;
        this.property.yng_Item.user.webSite=this.webSite;
        this.property.yng_Item.price=this.price;
        this.property.yng_Item.money=this.money;
        this.property.yng_Item.yng_Ubication.street=this.street;
        this.property.yng_Item.yng_Ubication.number=this.number;
        this.property.yng_Item.yng_Ubication.postalCode= this.postalCode;
        this.property.yng_Item.yng_Ubication.aditional=this.aditional;
        this.property.yng_Item.yng_Ubication.yng_Country=this.country;
        this.property.yng_Item.yng_Ubication.yng_Province=this.province;
        this.property.yng_Item.yng_Ubication.yng_City=this.city;
        this.property.yng_Item.yng_Ubication.yng_Barrio=this.barrio;
        //this.product.$cobertureZone=this.cobertureZone;
        //sise cobra publicidad por producto destacado aqui
        //this.property.yng_Item.isOver=false;
        this.priceItemS.emit(this.property);
      }
    }
    if(this.typeCatPre=="Motorized")
    {
      if(this.validarInmueble()){
        this.motorized.yng_Item.user.phone=this.phone;
        this.motorized.yng_Item.user.phone2=this.phone2;
        //this.product.$emailService=this.email;
        this.motorized.yng_Item.user.webSite=this.webSite;
        this.motorized.yng_Item.price=this.price;
        this.motorized.yng_Item.money=this.money;
        this.motorized.yng_Item.yng_Ubication.street=this.street;
        this.motorized.yng_Item.yng_Ubication.number=this.number;
        this.motorized.yng_Item.yng_Ubication.postalCode= this.postalCode;
        this.motorized.yng_Item.yng_Ubication.aditional=this.aditional;
        this.motorized.yng_Item.yng_Ubication.yng_Country=this.country;
        this.motorized.yng_Item.yng_Ubication.yng_Province=this.province;
        this.motorized.yng_Item.yng_Ubication.yng_City=this.city;
        this.motorized.yng_Item.yng_Ubication.yng_Barrio=this.barrio;
        //this.product.$cobertureZone=this.cobertureZone;
        //sise cobra publicidad por producto destacado aqui
        //this.motorized.yng_Item.isOver=false;
        this.priceItemS.emit(this.motorized);
      }
    }
  }

  resetService(){
    this.hidPhone=true;
    this.hidCountry=true;
    this.hidProvince=true;
    this.hidCity=true;
    this.hidStreet=true;
    this.hidNumber=true;
    this.hidPrice=true;
  }

  checkPrice(typePay:string){
    switch (typePay) {
      case "fijo":
        this.typePay= true;
        break;
      case "convenir":
        this.typePay= false;
        this.price=null;
        break;
      default:

    }
  }

  back(){
    this.Back.emit('back');
  }
  check(province:Province){   
    if(this.cobertureZone.length==0){
      this.cobertureZone.push({"province":province});
    }else{
      var aux=false;
      for(var i = 0, len = this.cobertureZone.length; i < len; i++) {
        if (JSON.stringify(JSON.parse(JSON.stringify(this.cobertureZone[i])).province) == JSON.stringify(province)) {
          this.cobertureZone.splice(i, 1);   
          aux=true;
          break;    
        }
      }
      if(!aux){
        this.cobertureZone.push({"province":province});
      }
    } 
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  keyPressCP(event: any){
    const pattern = /[0-9]/;
    
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
  }
  codigoPostalE:string;
  btnCP:boolean=false;
  provinciaCP:string;
  provinciaID:number;
  buscarCP(){
    if(this.codigoPostalE==""){alert("Introduzca un Código Postal");}
    else{

      this.cityList=[];

      this.sellService.getCP(this.codigoPostalE).subscribe(
        res => {
              this.cityList = JSON.parse(JSON.parse(JSON.stringify(res))._body);

              
  
              if(JSON.stringify(this.cityList)=="[]"){
                
                this.cityHid=true;
                this.barrioHid=true;
                alert("no se encontro el codigo postal ");
              } 
              else{
                this.provinciaCP=JSON.stringify(JSON.parse(JSON.stringify(this.cityList[0])).yng_Province.name);
                this.provinciaID=parseInt(JSON.stringify(JSON.parse(JSON.stringify(this.cityList[0])).yng_Province.provinceId));
              
                this.province.provinceId=this.provinciaID;
                
                this.cityHid=false;
                this.postalCode=this.codigoPostalE;
                this.btnCP=true;  
                             
              }
            },
            error => console.log(error)
      )
    }

  }

  getDniCuit(type : string){
    console.log("type:"+type);
    if(type=="2"){
      this.documentType="CUIT";
      this.maxDocumentNumber=13
      this.documentNumber="";
    }
    else{this.documentType="DNI";
    this.maxDocumentNumber=8;
    this.documentNumber="";
   }
  }

  popupUbication:boolean=true;
  aceptar(){
    this.resetHidFormUbication();
    if(this.country.countryId==null || this.country.countryId==0){
      this.hidUbicationCountry=false;
    }else if(this.province.provinceId==null||this.province.provinceId==0){  
      this.hidUbicationProvince=false;
    }else if(this.city.cityId==null||this.city.cityId==0){  
      this.hidUbicationCity=false;
    }else if(this.street==null || this.street==""){  
      this.hidUbicationStreet=false;
    }else if(this.number==null||this.number==""){  
      this.hidUbicationNumber=false;
    }else if(this.aditional==null||this.aditional==""){  
      this.hidUbicationAditional=false;
    }else if(this.telephone==null||this.telephone==""){  
      this.hidUbicationPhone=false;
    }else if(this.documentNumber==null||this.documentNumber==""){  
      this.hidUbicationDni=false;
    }
    else{
      this.product.yng_Item.yng_Ubication.street=this.street;
      this.product.yng_Item.yng_Ubication.number=this.number;
      this.product.yng_Item.yng_Ubication.postalCode= this.postalCode;
      this.product.yng_Item.yng_Ubication.aditional=this.aditional;
      this.product.yng_Item.yng_Ubication.yng_Country=this.country;
      this.product.yng_Item.yng_Ubication.yng_Province=this.province;
      this.product.yng_Item.yng_Ubication.yng_City=this.city;
      this.product.yng_Item.yng_Ubication.yng_Barrio=this.barrio;

      this.product.yng_Item.yng_Ubication.department=this.department;
      this.product.yng_Item.yng_Ubication.withinStreets=this.withinStreets;
      this.product.yng_Item.yng_Ubication.yng_Country=this.country;
      //console.log("ubication"+JSON.stringify(this.ubication));
        this.Usertemp.yng_Ubication=this.product.yng_Item.yng_Ubication;
        this.Usertemp.username=this.userNameP;
        this.Usertemp.phone=this.telephone;
        this.Usertemp.documentType=this.documentType;
        this.Usertemp.documentNumber=this.documentNumber.replace("-","");;
        this.Usertemp.password=this.useri.password;
        console.log("ubication"+JSON.stringify(this.Usertemp));
        this.buyService.setUserUbicationEditPersonalInfo(this.Usertemp).subscribe(
          res => {
                this.msg = JSON.parse(JSON.stringify(res))._body;
                if(this.msg!=""){
                  //this.sw=true;
                 // this.buyItem();
                 this.popupUbication=true;
                 this.popup_g=true;
                }
                else{
                  alert("Algo salio mal intente mas tarde");
                } 
              },
              error => console.log(error)
        );
      if(this.booleanPerson==true) this.popupEnvios=true;
      else this.popupEnvios=false;

      //sise cobra publicidad por producto destacado aqui
      //this.product.yng_Item.isOver=false;

      this.popupEnvios=false;
      this.popupUbicacion=true;
      this.popupUbication=true;
    }  
  }

  resetHidFormUbication(){
    this.hidUbicationCountry=true;
    this.hidUbicationProvince=true;
    this.hidUbicationCity=true;
    this.hidUbicationStreet=true;
    this.hidUbicationNumber=true;
    this.hidUbicationPhone=true;
    this.hidUbicationDni=true;
    this.hidUbicationAditional=true;
  }

  ubicacion(){
    this.popup_g=false;
    this.popupUbication=false;
    this.isBussines();
  }
  cambiarCP(){
    this.cityHid=true;
    this.postalCode="";
    this.number="";
    this.street="";
    this.aditional="";
    this.department="";
    this.withinStreets="";
    this.btnCP=false;
  }

  popup:boolean=true;
 popupEligeDomicilio:boolean=true;
 popupEnvios:boolean=true;
 popupGarantia:boolean=true;
 popupCotizar:boolean=true;
 popupUbicacion:boolean=true;
 ubication:Ubication=new Ubication();

  test(event) {  
    console.log("event:"+event.target.checked); 
    console.log("productTem:"+JSON.stringify(this.productTem));
    this.setPriceFreeAndreani ();  
    if(event.target.checked==true){
      this.checkRPerson=false;
      this.disabledRPerson=true;
      this.product.productFormDelivery="YingulEnvios"
      this.setPriceFreeAndreani();      
      this.consultarUbi();
      this.prodFormDeliv=true;
    }
    else {
      this.popupEnvios=true;
      this.popupUbicacion=true;
      this.prodFormDeliv=false;;
    }
  }

  test2(event) {  
    console.log("event:"+event.target.checked +"popPriUb"+this.popPriUb);    
    if(event.target.checked==true){
      this.product.productFormDelivery="YingulEnviosPersona"
      this.useri=JSON.parse(localStorage.getItem("user"));
      this.userNameP=this.useri.username;
      console.log("userNameP:"+this.userNameP);
      this.sellService.ConsultarUbicavionUser(this.userNameP).subscribe(
        res => {
          console.log("res:"+JSON.stringify(res));
          if(JSON.parse(JSON.stringify(res))._body==""){
              //this.ubication = JSON.parse(JSON.parse(JSON.stringify(res))._body);
            this.popPriUb=true;
            this.popupUbication=false;
            this.popupEnvios=true;
            this.booleanPerson=true;
          }
          else {
            this.popPriUb=false;
          }
            },
            error => console.log(error)
      );      
      if(this.popPriUb==true){
        this.popupUbication=false;
        this.popupEnvios=true;
        this.booleanPerson=true;
      }
    }
    else {
      //this.popupEnvios=true;
      //this.popupUbicacion=true;
    }
  }
  consultarUbi(){
    console.log("this.userName"+this.userName);
    this.sellService.ConsultarUbicavionUser(this.userName).subscribe(
      res => {
        //console.log(JSON.stringify(res));
        if(JSON.parse(JSON.stringify(res))._body!=""){
            this.ubication = JSON.parse(JSON.parse(JSON.stringify(res))._body);
           
           console.log(JSON.stringify(this.ubication));
          //alert(this.ubication.codAndreani+" "+this.ubication.postalCode);
           this.product.yng_Item.yng_Ubication=this.ubication;
            if(this.booleanPerson==true) this.popupEnvios=true;
            else this.popupEnvios=false;
            this.popupUbicacion=true;
        }
        else {
          this.popupEnvios=true;
          this.popupUbicacion=false;
  
        }
          },
          error => console.log(error)
    );
    
  }
  popGarantia(event) {
  
    console.log("event:"+event.target.checked);
    if(event.target.checked==true){this.popupGarantia=false;}
    else this.popupGarantia=true;
    console.log("popupGarantia:"+this.popupGarantia);
  
  }
  envioComprador(event){
  
    if(event.target.checked==true) this.product.productPagoEnvio="comprador";
    if(event.target.checked==true) {
      this.checkRPerson=true;
      this.disabledRPerson=false;
      this.disabledInter=false;
    }
  }
  envioGratis(event){
    
    if(event.target.checked==true) this.product.productPagoEnvio="gratis";
    if(event.target.checked==true) {
      this.checkRPerson=false;
      this.disabledRPerson=true;
      this.checkInter=false;
      this.disabledInter=true;
      this.product.yng_Item.internationalDeliveries=""
      this.product.yng_Item.logisticsName="Andreani"
    }
  }
  productSaleConditions:string;
  capturarCondicionVenta(provinceId : string){
    this.productSaleConditions=provinceId;
  }
  productPaymentMethod:string;
  pagoMedios(envi:string){
    if(envi=="1")
    this.productPaymentMethod="Aceptar pagos solo por Yingul Pay";
    if(envi=="2")
    this.productPaymentMethod="Aceptar pagos por Yingul Pay y cobro en persona";
    this.prodPayMethod=envi;
  }

  discountPrice(event){
    if(event.target.checked==true){
      this.popupDescuento=false;
      this.priceNormal=null;
      this.priceDiscount=null;
    }
    else {
      this.price=null;
    }
    //alert(this.priceDiscount1);
  }
  aceptarDiscount(){
    var a=this.priceNormal-this.priceDiscount;
    if(a>0){
      this.popupDescuento=true;
      this.checkedDiscount=false;
      this.product.yng_Item.priceDiscount=this.priceDiscount;
      this.product.yng_Item.priceNormal=this.priceNormal;
      this.price=this.priceDiscount;
    }
    else{
      alert("Los valores no son válidos");
    }
  }
  getCountry(countryId : number){
    this.countryHidden=true;
    var ret;
  for(let p of this.countryList){
    this.countryTemp=JSON.parse(JSON.stringify(p));
    if(countryId==this.countryTemp.countryId){              
      console.log("contry: " +JSON.stringify(this.countryTemp));
      this.country=this.countryTemp;
    }     
    this.countryName=this.country.name     
  }
}

  clickPostal(citydd:string){
    console.log("citydd:"+citydd);
  }
  getCP(cityId : number){
    this.city.cityId=cityId;
    this.barrioList=[];
    console.log("cityId:"+cityId);
    var ret="";
    for(let c of this.cityList){
      this.cityTem=JSON.parse(JSON.stringify(c));
      if(cityId==this.cityTem.cityId){ 
        ret=this.cityTem.codigopostal;
      }
    }
    console.log("ret:"+ret);
    this.postalCode=ret;
  }
  setPriceFreeAndreani(){
    var volumen:number; 
    volumen=parseInt(this.productTem.producVolumen);   
    var pesoR:number;
    pesoR=+this.productTem.productPeso/1000;
    var pesoA=volumen*3.5/10000;
    var dif=pesoR-pesoA;     
    if(dif>0){pesoA=pesoR;}
    pesoA=pesoA*1000; 
    console.log(" pesoA:"+pesoA);
    for(let p of this.listStandardCost){
      this.standardCost=JSON.parse(JSON.stringify(p));
      if(pesoA>=this.standardCost.weightFrom&&pesoA<=this.standardCost.weightUp) {
        console.log("standardCost:"+this.standardCost.rateBranch);
        this.precioEnvio=this.standardCost.rateBranch;
      }
      
    }
    
  
  }

  test3(event){
    if(event.target.checked==true){
      this.product.yng_Item.internationalDeliveries="fedex";
    }
    else this.product.yng_Item.internationalDeliveries="";
  }

  keyPressEmail(event: any) {
    const patron = /[a-z0-9@.\-_]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patron.test(inputChar)) {
      event.preventDefault();
    }
  }

  focus_g(){
    this.checkPrice('fijo');
    this.elem.nativeElement.querySelector('#option2').checked=true;

  }
  popupHide(){
    this.popupDescuento=true;
    this.priceDiscount1=false;
  }
  personC:Person=new Person();
  ubicationLabel:string;
  isBussines(){
    console.log("this.userName:"+this.userName);
    this.sellService.CosultarIsBussines(this.userName).subscribe(
      res => {
        this.personC = JSON.parse(JSON.parse(JSON.stringify(res))._body);
        console.log("this.person: "+JSON.stringify(this.personC));
        if(this.personC.business){
          this.ubicationLabel="INGRESA LA DIRECCIÓN DE LA CASA CENTRAL DE LA EMPRESA";
        }
        else {
          this.ubicationLabel="INGRESA ESTOS DATOS POR ÚNICA VEZ";
        }
          },
          error => console.log(error)
    );    
  }
  changeDocumentNumber(event: any) {
    if(  this.documentType=="CUIT")
    {
      this.documentNumber=this.documentNumber.replace("-","");
    if(this.documentNumber.length>=2&&this.documentNumber.length<=10){
      this.documentNumber=this.documentNumber.replace("-","");
      this.documentNumber = this.documentNumber.substring(0, 2)+"-"+this.documentNumber.substring(2, this.documentNumber.length);
    }
    if(this.documentNumber.length>10){
      this.documentNumber=this.documentNumber.replace("-","");
      this.documentNumber = this.documentNumber.substring(0, 2)+"-"+this.documentNumber.substring(2, 10)+"-"+this.documentNumber.substring(10, this.documentNumber.length);
    }
    }
    
    //this.documentNumber = this.documentNumber.substring(0, 2)+"-"+this.documentNumber.substring(2, 10)+"-"+this.documentNumber.substring(10, 11);
  }
}
