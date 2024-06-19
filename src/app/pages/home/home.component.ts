import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { Country } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { charsetDataTypes } from 'src/app/core/types/charsetDataType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  title = 'ng2-charts-demo';
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets: charsetDataTypes[] = [];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((result) => {
      if (result != undefined) {
        let nbrOfMedals: number[] = [];
        result.forEach((value: Country) => {
          this.pieChartLabels.push(value.country);
          let totParticipation = 0;
          value.participations.forEach((p: Participation) => {
            totParticipation = totParticipation + p.medalsCount;
          });
          nbrOfMedals.push(totParticipation);
        });
        this.pieChartDatasets = [{
          data: nbrOfMedals,
        }];
      }
    });
  }
  onChartClick = ($event: any) => {
    console.log($event);
  };
  countMedals(c: Country): any {
    let medalsCount = 0;
    c.participations.forEach(function (value) {
      medalsCount += value.medalsCount;
    });
    return medalsCount;
  }
}
