import { Component, NgZone } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FooterComponent, 
    FormsModule, 
    RouterLink, 
    CommonModule,
    NgxChartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  single: any[] = [
    // {
    //   name: 'Usuarios Activos',
    //   value: 0
    // },
    // {
    //   name: 'Usuarios Inactivos',
    //   value: 0
    // },
    {
      name: 'Total Usuarios',
      value: 0
    }
  ];
  
  view: [number, number] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#7aa3e5']
  };

  constructor(private ngZone: NgZone) {}

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('No se puede cargar múltiples archivos');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      let activos = 0;
      let inactivos = 0;
      let total = data.length;

      data.forEach((item: any) => {
        if (item.activo?.toLowerCase() === 'si') {
          activos++;
        } 
        if (item.inactivo?.toLowerCase() === 'si' || item.activo?.toLowerCase() === 'no') {
          inactivos++;
        }
      });

      // Actualizar los datos de la gráfica
      this.ngZone.run(() => {
        this.single = [
          // {
          //   name: 'Usuarios Activos',
          //   value: activos
          // },
          // {
          //   name: 'Usuarios Inactivos',
          //   value: inactivos
          // },
          {
            name: 'Total Usuarios',
            value: total
          }
        ];
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onSelect(event: any): void {
    console.log('Elemento seleccionado:', event);
  }
}