
// SVG Size



// Load CSV file

d3.csv('https://bcviscourse.github.io/lab4/data//wealth-health-2014.csv',
      row=>{
  return {
    ...row,
    Income:+row.Income
  };
}).then(data=>{
  // data sanity check
  console.log(data.columns, data[0]);
  
  let outerWidth = 960,
      outerHeight = 500;
  let margin = {top: 20, right: 10, bottom: 20, left: 30};
  let width = outerWidth - margin.left - margin.right,
      height = outerHeight - margin.top - margin.bottom;

  let svg = d3.select('.container').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height',  height + margin.top + margin.bottom);

  let group = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  let incomeMin = d3.min(data, d=>d.Income),
	  incomeMax = d3.max(data, d=>d.Income);

   let lifeexpmin = d3.min(data, d=> d.LifeExpectancy),
    lifeexpmax = d3.max(data, d=> d.LifeExpectancy);
  

  
  let circlerad = d3.scaleLinear()
    .domain([d3.min(data, (d)=>d.Population),d3.max(data, (d)=>d.Population)])
    .range([4, 30])

  let incomeScale = d3.scaleLinear()
    .domain([incomeMin, incomeMax])
	.range([0, width])
	
	let lifeScale= d3.scaleLinear()
		.domain([lifeexpmax, lifeexpmin])
		.range([0,height])

  let xAxis = d3.axisBottom()
    .scale(incomeScale)
	.ticks(5)

	let yAxis = d3.axisLeft()
		.scale(lifeScale)
		.ticks(10)

  let colorScale = d3.scaleSequential(d3.interpolateBlues)
	  .domain([incomeMin, incomeMax]);

  let colorReg = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(["South Asia", "Sub-Saharan Africa", "East Asia & Pacific", "Middle East & North Africa", "America", "Europe & Central Asia",])
  
  group.append('g')
    .attr("class", "axis x-axis")
    .attr('transform', `translate(${0}, ${height})`)
	.call(xAxis);

	group.append('g')
		.attr("class", "axis y-axis")
		.attr('transform', 'translate (0,'+ -height/2- 50 + ')')
    .call(yAxis);
    
  group.append("text")
    .attr("x", (4*width/5))
    .attr("y", (height) - 10)
    .style("text-anchor", "middle")
    .text("Income per Person (GDP per Capita)");
  
  group.append("text")
    .attr("transform","rotate(-90)")
    .attr("y", 0 - margin.left + 10)
    .attr("x", 0 - (height/2))
    .style("text-anchor", "middle")
    .text("Life Expectancy");


	group.selectAll("circle")
	.data(data)
	.enter()
	.append('circle')
	.attr('fill', d=>colorScale(d.Income))
  .attr('fill-opacity', 1)
  .attr('fill', (d,i)=>colorReg(d.Region))
	.attr('cx', (d,i)=>incomeScale(d.Income))
	.attr('cy',(d,i)=>lifeScale(d.LifeExpectancy))
  .attr('r',(d,i)=> circlerad(d.Population));



	



})