d3.json("data.json").then(function(data) {
    const tree = d3.tree().size([600, 400]).separation((a, b) => (a.parent == b.parent ? 1 : 2));
    const root = d3.hierarchy(data);
    const layout = tree(root);

    const svg = d3.select("body")
        .append("svg")
        .attr("width", 800)
        .attr("height", 500);

    svg.append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    const node = svg.selectAll(".node")
        .data(layout.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("r", 10)
        .attr("fill", "#fff")
        .attr("stroke", "#999")
        .attr("stroke-width", 2);

    node.append("text")
        .attr("dx", -10)
        .attr("dy", -14)
        .text(d => d.data.name);

    // 添加 parameters 容器
    node.append("text")
        .attr("dx", -10)
        .attr("dy", 4)
        .text(d => d.data.parameters ? `Parameters: ${JSON.stringify(d.data.parameters)}` : "")
        .attr("font-size", 12)
        .attr("fill", "#666");

    // 添加 results 容器
    node.append("text")
        .attr("dx", -10)
        .attr("dy", 20)
        .text(d => d.data.results ? `Results: ${JSON.stringify(d.data.results)}` : "")
        .attr("font-size", 12)
        .attr("fill", "#666");

    const link = svg.selectAll(".link")
        .data(layout.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x))
        .attr("fill", "none")
        .attr("stroke", "#999")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");
});