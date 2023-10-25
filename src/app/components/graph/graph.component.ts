import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import { CommitDetails } from 'src/app/models/commit.model';
import { CommitsService } from 'src/app/services/commits.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, AfterViewInit {
  private svg: any;
  frontCommits!: CommitDetails[];
  backCommits!: CommitDetails[];
  excludedPoints = [{ x: 0, y: 50 }];

  constructor(
    private elementRef: ElementRef,
    private commitsService: CommitsService
  ) {}

  ngOnInit(): void {
    this.createSVG();
    const svg = this.elementRef.nativeElement.querySelector(
      'svg'
    ) as SVGElement;
    svg.style.backgroundColor = '#bdb6c9';
    svg.style.borderRadius = '15px';
    svg.style.display = 'block';
  }

  async ngAfterViewInit(): Promise<void> {
    try {
      const commits = <CommitDetails[]>(
        await this.commitsService.getAllCommits()
      );
      this.backCommits = commits;

      const pathData = [
        { x: 0, y: 50 },
        { x: 100, y: 50 },
        { x: 300, y: 50 },
        { x: 500, y: 50 },
        { x: 550, y: 50 },
        { x: 600, y: 100 },
        { x: 550, y: 150 },
        { x: 500, y: 150 },
        { x: 300, y: 150 },
        { x: 100, y: 150 },
        { x: 50, y: 150 },
        { x: 0, y: 200 },
        { x: 50, y: 250 },
        { x: 100, y: 250 },
      ];

      const pathDatatest = this.formPathData(commits.length);

      this.drawPath(pathDatatest);
      const path = this.elementRef.nativeElement.querySelector(
        'path'
      ) as SVGElement;
      const pathBoxSize = path.getBoundingClientRect();
      const pathHeigth = pathBoxSize.height;

      const svgContainer = this.elementRef.nativeElement.querySelector(
        'svg'
      ) as SVGElement;
      svgContainer.style.height = pathHeigth + 100 + 'px';
    } catch (error) {
      alert(error);
    }
  }

  private createSVG(): void {
    const container = this.elementRef.nativeElement.querySelector(
      '.commits-path'
    ) as HTMLElement;

    // Create SVG element
    this.svg = d3
      .select(container)
      .append('svg')
      .attr('width', '95%')
      .attr('background-color', '#f0f8ff');
  }

  private drawPath(data: any[]): void {
    // Create line generator
    const lineGenerator = d3
      .line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
      .curve(d3.curveBasis);

    // Draw path
    this.svg
      .append('path')
      .datum(data)
      .attr('transform', 'translate(150, 0)')
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

    this.svg
      .selectAll('circle')
      .data(pointsArray)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .attr('r', 5)
      .attr('transform', 'translate(150, 0)');

    this.svg
      .selectAll('text')
      .data(pointsArray)
      .enter()
      .append('text')
      .attr('x', (d: any) => d.x)
      .attr('y', (d: any) => d.y - 10)
      .text((d: any) => d.x)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('transform', 'translate(150, 0)');
  }

  formPathData(commitsCount: number) {
    const pathData = [{ x: 0, y: 50 }];

    const pointsxLine = 3;

    let x: number = 50;
    let y: number = 50;
    const lines = Math.ceil(commitsCount / pointsxLine);
    const residual = commitsCount % pointsxLine;
    let totalLength: number = 0;
    if (commitsCount % pointsxLine !== 0) {
      totalLength =
        lines * pointsxLine +
        (lines - 1) * pointsxLine +
        1 -
        (pointsxLine - residual); //add the initial length of pathData
    } else {
      totalLength = lines * pointsxLine + (lines - 1) * pointsxLine + 1;
    }

    for (let i = 1; i <= lines; i++) {
      if (i % 2 === 0) {
        // Add points
        x -= 50;
        for (let j = 1; j < pointsxLine; j++) {
          pathData.push({ x, y });
          x -= 200;
        }
        pathData.push({ x, y });
        // breaks
        x -= 50;
        for (let j = 1; j < pointsxLine; j++) {
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
        for (let j = 1; j < pointsxLine; j++) {
          pathData.push({ x, y });
          x += 200;
        }
        pathData.push({ x, y });
        // breaks
        x += 50;
        for (let j = 1; j < pointsxLine; j++) {
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
