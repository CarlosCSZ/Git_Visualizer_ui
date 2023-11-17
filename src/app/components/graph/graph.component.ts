import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environments/environment';

import { CommitDetails } from 'src/app/models/commit.model';
import { CommitsStorageService } from 'src/app/services/commits-storage.service';
import { CommitsService } from 'src/app/services/commits.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, AfterViewInit {
  private svg: any;
  private commits!: CommitDetails[];
  private excludedPoints = [{ x: 0, y: 80 }];
  @Input() side: string = '';
  private frontRepo = environment.FRONT_REPO;
  private backRepo = environment.BACK_REPO;
  loading = true;

  constructor(
    private elementRef: ElementRef,
    private commitsService: CommitsService,
    private commitsStorageService: CommitsStorageService,
    private mensaje: ToastrService
  ) {}

  ngOnInit(): void {
    this.createSVG();
    const svg = this.elementRef.nativeElement.querySelector(
      'svg'
    ) as SVGElement;
    svg.style.backgroundColor = '#bdb6c9';
    svg.style.borderRadius = '25px';
    svg.style.display = 'block';
  }

  ngAfterViewInit(): void {
    let repo = '';
    if (this.side === 'front') {
      repo = this.frontRepo;
    } else {
      repo = this.backRepo;
    }
    this.commitsService.getAllCommits(repo)
    .subscribe({
      next: (data) => {
        this.commits = data;
        this.loading = false;


        const pathDatatest = this.formPathData(this.commits.length);

        this.drawPath(pathDatatest, this.commits);
        const path = this.elementRef.nativeElement.querySelector(
          'path'
        ) as SVGElement;
        const pathBoxSize = path.getBoundingClientRect();
        const pathHeigth = pathBoxSize.height;

        const svgContainer = this.elementRef.nativeElement.querySelector(
          'svg'
        ) as SVGElement;
        svgContainer.style.height = pathHeigth + 100 + 'px';
      },
      error: (error) => {
        this.mensaje.error('No se pudo encontrar commits. Intentelo mas tarde.');
        console.log(error);
        this.loading = true;
      }
    });
  }

  private createSVG(): void {
    const container = this.elementRef.nativeElement.querySelector(
      '.commits-path'
    ) as HTMLElement;

    // Create SVG element
    this.svg = d3
      .select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('background-color', '#f0f8ff');
  }

  private drawPath(
    data: { x: number; y: number }[],
    commits: CommitDetails[]
  ): void {
    // Create line generator
    const lineGenerator = d3
      .line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
      .curve(d3.curveBasis);

    let translateX = 100;
    if (window.innerWidth < 750) {
      translateX = 150;
    }
    if (window.innerWidth < 500) {
      translateX = 80;
    }

    // Draw path
    this.svg
      .append('path')
      .datum(data)
      .attr('transform', `translate(${translateX}, 0)`)
      .attr('fill', 'none')
      .attr('stroke', '#124470') // Line color
      .attr('stroke-width', 4) // Line width
      .attr('d', lineGenerator);

    // Draw points
    const pointsArray = data.filter(
      (point) =>
        !this.excludedPoints.some(
          (excludedPoint) =>
            excludedPoint.x === point.x && excludedPoint.y === point.y
        )
    );

    const dataMerged = [];
    for (let i = 0; i < commits.length; i++) {
      const point = pointsArray[i];
      const commit = commits[i];
      dataMerged.push({
        ...commit,
        ...point,
      });
    }

    this.svg
      .selectAll('circle')
      .data(dataMerged)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .attr('r', 10)
      .attr('transform', `translate(${translateX}, 0)`)
      .attr('cursor', 'pointer')
      .attr('data', (d: any) => d);

    this.svg
      .selectAll('text')
      .data(dataMerged)
      .enter()
      .append('text')
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y - 15)
      .text((d: CommitDetails) => d.date)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('font-weight', 700)
      .attr('font-size', 12)
      .attr('transform', `translate(${translateX}, 0)`);

    // Hover
    this.svg
      .selectAll('circle')
      .on('mouseenter', function (event: any, d: any) {
        d3.select(event.currentTarget).attr('fill', '#b695c2').attr('r', 13);
      })
      .on('mouseleave', function (event: any, d: any) {
        d3.select(event.currentTarget).attr('fill', 'black').attr('r', 10);
      });

    // Click event
    this.svg.selectAll('circle').on('click', (event: any, d: any) => {
      if (this.side === 'front') {
        this.commitsStorageService.setFrontCommit(d);
      } else {
        this.commitsStorageService.setBackCommit(d);
      }
    });
  }

  formPathData(commitsCount: number) {
    const pathData = [{ x: 0, y: 80 }];

    let pointsxLine = 3;
    if (window.innerWidth < 750) {
      pointsxLine = 1;
    }

    let x: number = 50;
    let y: number = 80;
    const lines = Math.ceil(commitsCount / pointsxLine);
    const residual = commitsCount % pointsxLine;

    let totalLength: number = 0;
    if (commitsCount % pointsxLine !== 0) {
      totalLength =
        lines * pointsxLine +
        (lines - 1) * 3 + // 3 points fro breaks
        1 - //add the initial length of pathData
        (pointsxLine - residual);
    } else {
      totalLength = lines * pointsxLine + (lines - 1) * 3 + 1;
    }

    for (let i = 1; i <= lines; i++) {
      if (i % 2 === 0) {
        // Add points
        x -= 50;
        for (let j = pointsxLine === 1 ? 0 : 1; j < pointsxLine; j++) {
          pathData.push({ x, y });
          x -= 200;
        }
        if (window.innerWidth >= 750) {
          pathData.push({ x, y });
        } else {
          x += 200;
        }
        // breaks
        x -= 50;
        for (let j = 1; j < 3; j++) {
          pathData.push({ x, y });
          this.excludedPoints.push({ x, y });
          x -= 50;
          y += 50;
        }
        x += 100;
        pathData.push({ x, y });
        this.excludedPoints.push({ x, y });
      } else {
        // Add points
        x += 50;
        for (let j = pointsxLine === 1 ? 0 : 1; j < pointsxLine; j++) {
          pathData.push({ x, y });
          x += 200;
        }
        if (window.innerWidth >= 750) {
          pathData.push({ x, y });
        } else {
          x -= 200;
        }
        // breaks
        x += 50;
        for (let j = 1; j < 3; j++) {
          pathData.push({ x, y });
          this.excludedPoints.push({ x, y });
          x += 50;
          y += 50;
        }
        x -= 100;
        pathData.push({ x, y });
        this.excludedPoints.push({ x, y });
      }
    }
    const adjustedPathData = pathData.slice(0, totalLength);
    return adjustedPathData;
  }
}
