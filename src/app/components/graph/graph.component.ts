import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit, AfterViewInit {
  private svg: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createSVG();
    const svg = this.elementRef.nativeElement.querySelector('svg') as SVGElement;
    svg.style.backgroundColor = '#bdb6c9';
    svg.style.borderRadius = '20%';
    svg.style.overflow = 'scroll';
  }

  ngAfterViewInit(): void {
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

    this.drawPath(pathData);
    const path = this.elementRef.nativeElement.querySelector('path') as HTMLElement;
    const pathBoxSize = path.getBoundingClientRect();
    const pathHeigth = pathBoxSize.height;

    const container = this.elementRef.nativeElement.querySelector('.commits-path') as HTMLElement;
    container.style.height = pathHeigth + 100 + 'px';
  }

  private createSVG(): void {
    const container = this.elementRef.nativeElement.querySelector('.commits-path') as HTMLElement;

    // Create SVG element
    this.svg = d3
      .select(container)
      .append('svg')
      .attr('width', '65%')
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
      .attr('transform', 'translate(200, 0)')
      .attr('fill', 'none')
      .attr('stroke', '#124470') // Line color
      .attr('stroke-width', 4) // Line with
      .attr('d', lineGenerator);

    // Draw points
    const excludedPoints = [
      { x: 0, y: 50 },
      { x: 550, y: 50 },
      { x: 600, y: 100 },
      { x: 550, y: 150 },
      { x: 50, y: 150 },
      { x: 0, y: 200 },
      { x: 50, y: 250 },
    ];
    const pointsArray = data.filter((point) => (
      ! excludedPoints.some(excludedPoint => (
        excludedPoint.x === point.x && excludedPoint.y === point.y
      ))
    ))
    console.log(pointsArray)
    this.svg
      .selectAll('circle')
      .data(pointsArray)
      .enter()
      .append('circle')
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y)
      .attr('r', 5)
      .attr('transform', 'translate(200, 0)');

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
      .attr('transform', 'translate(200, 0)');


  }
}
