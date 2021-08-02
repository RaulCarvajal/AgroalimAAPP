import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { encuesta } from 'src/app/interfaces/encuestas.interface';
import { qa_chart, qa_text } from 'src/app/interfaces/qa.interface';
import { AuthService } from 'src/app/servicios/auth.service';
import { EncuestasService } from 'src/app/servicios/encuestas.service';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
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
  respuestas_chart:any [] = [];
  organizaciones:organizacionesempresa[]=[];

  charts:boolean = false;

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
      },
      err => console.log(err)
    );
  }

  getEncuestas(id_encuesta:number){
    this.es.getOneById(id_encuesta).subscribe(
      res => {
        this.encuesta = res;
        this.getRespuestas(this.encuesta.id_encuesta,this.as.getEmpresaId())
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
  }

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
        this.ChartData.push( { ChartDataSets : [{ data: [] }]} );
      }
      element.forEach(e=>{
        this.ChartLabels[index].Labels.push(e.texto);
        this.ChartData[index].ChartDataSets[0].data?.push(e.valor);
      })
    } 
    this.charts = true;
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

}