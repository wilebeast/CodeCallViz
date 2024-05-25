d3.json("data.json").then(function(data) {
    const tree = d3.tree().size([800, 600]);

    // 自定义 separation 函数,增大节点间的垂直间距
    tree.separation((a, b) => {
        if (a.parent == b.parent) return 1.5; // 增大兄弟节点之间的垂直间距
        return 3 / a.depth; // 保持不同层级节点的水平间距
    });

    const root = d3.hierarchy(data);
    const layout = tree(root);

    const svg = d3.select("body")
        .append("svg")
        .attr("width", 800)
        .attr("height", 600);

    const node = svg.selectAll(".node")
        .data(layout.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("r", 15)
        .attr("fill", "#fff")
        .attr("stroke", "#999")
        .attr("stroke-width", 2);

    node.append("text")
        .attr("dx", -15)
        .attr("dy", -20)
        .text(d => d.data.name);

    // 将参数和结果信息显示在节点下方
    node.append("text")
        .attr("dx", 0)
        .attr("dy", 30)
        .text(d => d.data.parameters ? `Parameters: ${JSON.stringify(d.data.parameters, null, 2)}` : "")
        .attr("font-size", 12)
        .attr("fill", "#666")
        .attr("class", "json-data");

    node.append("text")
        .attr("dx", 0)
        .attr("dy", 46)
        .text(d => d.data.results ? `Results: ${JSON.stringify(d.data.results, null, 2)}` : "")
        .attr("font-size", 12)
        .attr("fill", "#666")
        .attr("class", "json-data");

    const link = svg.selectAll(".link")
        .data(layout.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkVertical()
            .x(d => d.y)
            .y(d => d.x))
        .attr("fill", "none")
        .attr("stroke", "#999")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");
});