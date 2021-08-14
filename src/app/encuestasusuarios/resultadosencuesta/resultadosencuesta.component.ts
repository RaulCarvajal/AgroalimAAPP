import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { encuesta } from 'src/app/interfaces/encuestas.interface';
import { qa, qa_chart, qa_radar, qa_text } from 'src/app/interfaces/qa.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { EncuestasService } from 'src/app/servicios/encuestas.service';

import { ChartDataSets, ChartType, ChartOptions, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartDataSetsArray, LabelArray } from 'src/app/interfaces/charts.interface';
import { OrganizacionesempresaService } from 'src/app/servicios/organizacionesempresa.service';
import { organizacionesempresa } from 'src/app/interfaces/organizacionesempresa.interface';

@Component({
  selector: 'app-resultadosencuesta',
  templateUrl: './resultadosencuesta.component.html',
  styleUrls: ['./resultadosencuesta.component.css']
})
export class ResultadosencuestaComponent implements OnInit {

  id_encuesta:number;
  id_empresa:number;
  encuesta:encuesta;
  respuestas:qa_text [] = [];  
  respuestas_qa:qa [] = [];  
  respuestas_chart:any [] = [];
  organizaciones:organizacionesempresa[]=[];

  charts:boolean = false;

  showRadar:boolean = false;

  constructor(
    private ar:ActivatedRoute,
    private as:AuthService,
    private es:EncuestasService,
    private oes:OrganizacionesempresaService
  ) { 
    this.id_encuesta = +ar.snapshot.paramMap.get("id")!;
    this.getOrganizacionesEmpresa();
  }

  ngOnInit(): void {
    this.getEncuestas(this.id_encuesta);
  }

  getRespuestas(id_encuesta:number, id_empresa:number){
    this.es.getRespuestas(id_encuesta,id_empresa).subscribe(
      res => {
        this.respuestas = res;
        this.getResultadosGenerales();
      }
    );
    this.es.tieneRespuestas(id_empresa,id_encuesta).subscribe(
      res => {
        this.respuestas_qa = res;
        this.getRespuestasGeneralRadar();
      }
    );
  }
  getEncuestas(id_encuesta:number){
    this.es.getOneById(id_encuesta).subscribe(
      res => {
        this.encuesta = res;
        this.getRespuestas(this.encuesta.id_encuesta,this.as.getEmpresaId())
        this.getMisRespuestasRadar(this.encuesta.id_encuesta,this.as.getEmpresaId());
      },
      err => {
        console.log(err)
      }
    );
  }
  async getResultadosGenerales(){
    for await (const resp of this.respuestas) {
      let res:any = await this.es.getResultadosGenerales(resp.id_respuesta);
      this.respuestas_chart.push(res);
    }
    this.setChartData()
    this.setLabels();
  }
  getOrganizacionesEmpresa(){
    this.oes.getOrganizacionesDeEmpresa(this.as.getEmpresaId()).subscribe(
      res => {
        this.organizaciones = res;
      },err => {
        console.log(err)
      }
    )
  }
  changeChartType(){
    if(this.ChartType=="radar"){
      this.showRadar=true;
    }else{
      this.showRadar=false;
    }
  }

  //Encuestas! - Barras 
  public ChartOptions: ChartOptions = {
    responsive: true,
    scales: { 
      xAxes: [{}], 
      yAxes: [{
        ticks : {
          beginAtZero : true,
          stepSize: 1
        }
      }] 
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public ChartType: ChartType = 'pie';
  public ChartLegend = false;
  public ChartLabels: LabelArray[] = [{ Labels : []}];
  public ChartData: ChartDataSetsArray[] = [{ ChartDataSets : [{ data: [] }]}];
  setChartData(){
    for (let index = 0; index < this.respuestas_chart.length; index++) {
      const element:qa_chart[] = this.respuestas_chart[index];
      if(index>0){
        this.ChartLabels.push( { Labels : []} );
        this.ChartData.push( { ChartDataSets : [{ data: [], label : 'Respuestas' }]} );
      }
      element.forEach(e=>{
        this.ChartLabels[index].Labels.push(e.texto);
        this.ChartData[index].ChartDataSets[0].data?.push(e.valor);
      })
    }
    this.charts = true;
  }
  //Encuestas! - Barras

  //Encuestas radar
  public radarChartOptionsGeneral: RadialChartOptions = {
    responsive: true,
  };
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale : {
      ticks : {
        beginAtZero : true,
        suggestedMax : 100
      }
    }
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'Mis respuestas' },
    { data: [], label: 'Promedio General' }
  ];
  public radarChartType: ChartType = 'radar';
  //Encuestas radar
  respuestas_radar:qa_radar[]=[];

  getMisRespuestasRadar(id_encuesta:number,id_empresa:number){
    this.es.getMisResultadosParaRadar(id_encuesta,id_empresa).subscribe(
      res => {
        this.respuestas_radar = res;
        this.setRadarData();
      },
      err => console.log(err)
    );
  }
  setRadarData() {
    this.respuestas_radar.forEach( r => {
      this.radarChartData[0].data?.push(r.valor);
    })
  }
  async getRespuestasGeneralRadar(){
    for await (const resp of this.respuestas_qa) {
      let res:any = await this.es.getPromedioGeneralPregunta(resp.fk_id_pregunta);
      this.radarChartData[1].data?.push(Math.floor(res[0]));
    }
  }

  org:number = 0;
  change(){
    this.radarChartData.push(
      { data: [88, 38, 10, 15, 25, 19, 25], label: this.organizaciones.find( e => e.id_organizacon == this.org)?.organizacion }
    );
  }
  setLabels(){
    let no=1;
    this.respuestas.forEach(e => {
      this.radarChartLabels.push(e.etiqueta!);
      no++;
    })
  }
}