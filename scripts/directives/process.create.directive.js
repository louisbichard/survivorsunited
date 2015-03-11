SU.directive('d3CreateProcess', function() {
    return {
        restrict: 'EA',
        scope: {
            tasks: '=',
        },
        link: function(scope, element, attrs, $window) {

            var canvas = d3.select(element[0])
                .html('') // Reset the canvas so that it redraws on init command
                .append('svg')
                .attr("width", '100%')
                .style('background-color', 'red')
                .attr("height", '100%');

            var init = function() {
                var drag = d3.behavior.drag().on('dragstart', function() {
                        d3.select(this.children[0]).style('fill', 'yellow');
                    })
                    .on('drag', function() {
                        createLines();
                        d3.select(this)
                            .attr("transform",
                                "translate(" +
                                // ADD CORDINATES OF THE CIRCLE INSIDE THE G(GROUP) ELEMENT
                                (d3.event.x - this.children[0].attributes.cx.value) +
                                "," +
                                (d3.event.y - this.children[0].attributes.cy.value) +
                                ")"
                            );
                    })
                    .on('dragend', function() {
                        d3.select(this.children[0]).style('fill', 'purple');
                    });


                var inc = 0;
                // CREATE GROUPINGS AND CIRCLES WITH LABELS
                _.each(scope.tasks, function(curr) {

                    var g = canvas.append('g')
                        .attr('id', 'task-' + curr.id)
                        .call(drag);

                    g.insert("circle")
                        .attr("cx", 50 + inc)
                        .attr("cy", 50 + inc)
                        .attr("r", 50)
                        .style("fill", "purple");



                    g.append('text')
                        .style("fill", "white")
                        .attr("dx", 50 + inc)
                        .attr("dy", 50 + inc)
                        .attr("text-anchor", "middle")
                        .text(function(d) {
                            return curr.id;
                        });

                    inc = inc + 150;
                });
            };

            var createLines = function() {
                canvas.selectAll('.dependency-line').remove();

                _.each(scope.tasks, function(curr) {

                    var g = canvas.select('#task-' + curr.id);
                    var circle = g[0][0].children[0];

                    var circle_x = circle.cx.baseVal.value;
                    var circle_y = circle.cy.baseVal.value;

                    var g_x = d3.transform(g.attr("transform")).translate[0];
                    var g_y = d3.transform(g.attr("transform")).translate[1];

                    var start_x = circle_x + g_x;
                    var start_y = circle_y + g_y;

                    _.each(curr.dependencies, function(id) {

                        var g = canvas.select('#task-' + id);
                        var circle = g[0][0].children[0];

                        var circle_x = circle.cx.baseVal.value;
                        var circle_y = circle.cy.baseVal.value;

                        var g_x = d3.transform(g.attr("transform")).translate[0];
                        var g_y = d3.transform(g.attr("transform")).translate[1];

                        var end_x = circle_x + g_x;
                        var end_y = circle_y + g_y;

                        // Draw line between dependent nodes
                        canvas.append("line")
                            .classed('dependency-line', true)
                            .style("stroke", "black")
                            .style("stroke-width", "5")
                            .attr("x1", start_x)
                            .attr("y1", start_y)
                            .attr("x2", end_x)
                            .attr("y2", end_y);
                    });
                });
            }

            // Browser onresize event
            window.onresize = function() {
                scope.$apply();
            };

            // TODO: Watch for resize event  scope.render(scope.data);

            scope.$watch('tasks', function() {
                init();
                createLines();
                console.log('init because tasks reset');
            }, true);

        }
    };
});