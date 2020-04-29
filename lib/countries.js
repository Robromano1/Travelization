
document.addEventListener("DOMContentLoaded", () => {
	const data = [
		{
			country: "France",
			visitors: 86.9
		},
		{ 
			country: "Spain",
			visitors: 81.8
		},
		{
			country: "United States",
			visitors: 76.9
		},
		{
			country: "China",
			visitors: 60.7
		},
		{
			country: "Italy",
			visitors: 58.3
		},
		{
			country: "Mexico",
			visitors: 39.3
		},
		{
			country: "United Kingdom",
			visitors: 37.7
		},
		{
			country: "Turkey",
			visitors: 37.6
		},
		{
			country: "Germany",
			visitors: 37.5
		},
		{
			country: "Thailand",
			visitors: 35.4
		}
	]

	const margin = 60;
	const width = 1000 - 2 * margin;
	const height = 600 - 2 * margin;

	const svg = d3.select("#countryGraph");
	const svgContainer = d3.select("#container");

	const chart = svg.append('g')
		.attr('transform', `translate(${margin}, ${margin})`)

	const yScale = d3.scaleLinear()
		.range([height, 0])
		.domain([0, 100]);

		
		const xScale = d3.scaleBand()
		.range([0, width])
		.domain(data.map((d) => d.country))
		.padding(0.4);

	const makeYLines = () => d3.axisLeft() 
		.scale(yScale)
		
	chart.append('g')
		.call(d3.axisLeft(yScale));

	chart.append('g')
		.attr("transform", `translate(0, ${height})`)
		.call(d3.axisBottom(xScale));

	chart.append('g')
		.attr('class', 'grid')
		.call(makeYLines()
			.tickSize(-width, 0, 0)
			.tickFormat('')
		)

	const barGroups = chart.selectAll()
		.data(data)
		.enter()
		.append('g')

	barGroups
    .append("rect")
    .attr("class", "bar")
    .attr("x", g => xScale(g.country))
    .attr("y", g => yScale(g.visitors))
    .attr("height", g => height - yScale(g.visitors))
    .attr("width", xScale.bandwidth())
    .on("mouseenter", function(actual, i) {
      d3.selectAll(".value").attr("opacity", 0);

      d3.select(this)
        .transition()
        .duration(300)
        .attr("opacity", 0.6)
        .attr("x", a => xScale(a.country) - 5)
        .attr("width", xScale.bandwidth() + 10);

      const y = yScale(actual.visitors);

      line = chart
        .append("line")
        .attr("id", "limit")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", width)
        .attr("y2", y);

      barGroups
        .append("text")
        .attr("class", "divergence")
        .attr("x", a => xScale(a.country) + xScale.bandwidth() / 2)
        .attr("y", a => yScale(a.visitors) + 30)
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        // .text((a, idx) => {
        //   const divergence = (a.visitors - actual.visitors).toFixed(1);

        //   let text = "";
        //   if (divergence > 0) text += "+";
        //   text += `${divergence}%`;

        //   return idx !== i ? text : "";
        // });
		})
		.on('mouseleave', function () {
				d3.selectAll('.value')
					.attr('opacity', 1)

				d3.select(this)
					.transition()
					.duration(300)
					.attr('opacity', 1)
					.attr('x', (a) => xScale(a.country))
					.attr('width', xScale.bandwidth())

				chart.selectAll('#limit').remove()
				chart.selectAll('.divergence').remove()
			})

		barGroups
      .append("text")
      .attr("class", "value")
      .attr("x", a => xScale(a.country) + xScale.bandwidth() / 2)
      .attr("y", a => yScale(a.visitors) - 5)
      .attr("text-anchor", "middle")
      .text(a => `${a.visitors}`);

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", -(height / 2) - margin)
      .attr("y", margin / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
			.text("Number of visitors per year(millions)");
			
		svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 2 + margin)
      .attr("y", height + margin * 1.7)
      .attr("text-anchor", "middle")
      .text("Countries");

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2 + margin)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      //.text("Most visited countries");

		 svg
       .append("text")
       .attr("class", "source")
       .attr("x", width - margin / 2)
       .attr("y", height + margin * 1.7)
       .attr("text-anchor", "start")
       .text("Source: bigseventravel.com");
});





	
	
	