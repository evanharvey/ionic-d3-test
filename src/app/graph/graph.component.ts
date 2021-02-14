import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @ViewChild('graph', {static: false}) set fn(element: ElementRef) {
    this.element = element
    this.drawing()
  };

  @Input() item: any[]

  public element: ElementRef

  constructor() { }

  ngOnInit(): void {

  }
  
  ngOnChanges() {
    this.drawing()
  }

  drawing() {
    if (this.element == undefined) {
      return
    }

    const svg = d3.select(this.element.nativeElement)
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)

    const width = Number.parseInt(svg.attr('width')) - 100
    const height = Number.parseInt(svg.attr('height')) - 100

    const xScale = d3.scaleBand().range([0, width]).padding(0.4)
    const yScale = d3.scaleLinear().range([height, 0])

    const g = svg.append('g').attr('transform', `translate(${40}, ${40})`)

    xScale.domain(this.item.map(d => d.Country))
    yScale.domain([0, d3.max(this.item, (d) => { return d.Value; })]);

    const xAxis = g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

    const yAxis = g.append("g")
    .call(d3.axisLeft(yScale).tickFormat((d) => {
      return "$" + d;
    }).ticks(10));

    g.selectAll(".bar")
    .data(this.item)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.Country); })
    .attr("y", function(d) { return yScale(d.Value); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale(d.Value); });

    setInterval(() => {
      const data = [
        {Country: '일', Value: Math.random() * 10000},
        {Country: '월', Value: Math.random() * 10000},
        {Country: '화', Value: Math.random() * 10000},
        {Country: '수', Value: Math.random() * 10000},
        {Country: '목', Value: Math.random() * 10000},
        {Country: '금', Value: Math.random() * 10000},
        {Country: '토', Value: Math.random() * 10000}
      ]

      yScale.domain([0, d3.max(data, (d) => { return d.Value; })]);
      yAxis.transition().duration(1000).call(d3.axisLeft(yScale));

      g.selectAll(".bar")
      .data(data)
      .transition()
      .duration(1000)
      .attr("y", function(d) { return yScale(d.Value); })
      .attr("height", function(d) { return height - yScale(d.Value); });
    }, 1000)
  }
}
