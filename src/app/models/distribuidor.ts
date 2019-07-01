
export class Distribuidor{
	constructor(
		public id:number,
		public clave_interna:number,
		public nombre:string,
		public estado:string,
		public codigo_posta:string,
		public lat:string,
		public long:String,
		public estatus:boolean,
		public domicilio:string,
		public zona:string
	){}
}