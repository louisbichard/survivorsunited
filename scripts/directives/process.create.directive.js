SU.directive('d3CreateProcess', function() {
    return {
        restrict: 'EA',
        scope: {
            tasks: '=',
        },
        link: function(scope, element, attrs, $window) {

            var init = function() {

                var canvas = d3.select(element[0])
                    .html('') // Reset the canvas so that it redraws on init command
                    .append('svg')
                    .attr("width", '100%')
                    .style('background-color', 'red')
                    .attr("height", '100%');

                var drag = d3.behavior.drag().on('dragstart', function() {
                        d3.select(this.children[0]).style('fill', 'yellow');
                    })
                    .on('drag', function() {
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
                        .attr("cy", 50)
                        .attr("r", 50)
                        .style("fill", "purple");



                    g.append('text')
                        .style("fill", "white")
                        .attr("dx", 50 + inc)
                        .attr("dy", 50)
                        .attr("text-anchor", "middle")
                        .text(function(d) {
                            return curr.id;
                        });

                    inc = inc + 150;
                });

                // CREATE GROUPINGS AND CIRCLES WITH LABELS
                _.each(scope.tasks, function(curr) {

                    var start_node = canvas.select('#task-' + curr.id)[0][0].children[0];

                    var start_x = start_node.cx.baseVal.value;
                    var start_y = start_node.cy.baseVal.value;
                    console.log(curr.id);

                    _.each(curr.dependencies, function(id) {

                        var end_node = canvas.select('#task-' + id)[0][0].children[0];

                        var end_x = end_node.cx.baseVal.value;
                        var end_y = end_node.cy.baseVal.value;

                        // Draw line between dependent nodes
                        canvas.append("line")
                            .style("stroke", "black")
                            .style("stroke-width", "5")
                            .attr("x1", start_x)
                            .attr("y1", start_y)
                            .attr("x2", end_x)
                            .attr("y2", end_y);
                    });



                });
            };

            // Browser onresize event
            window.onresize = function() {
                scope.$apply();
            };

            // TODO: Watch for resize event  scope.render(scope.data);

            scope.$watch('tasks', function() {
                init();
                console.log('init because tasks reset');
            }, true);

            init(); // run setup at the start
        }
    };
});