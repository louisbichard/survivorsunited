SU.directive('d3CreateProcess', function() {
    return {
        restrict: 'EA',
        scope: {},
        link: function(scope, element, attrs, $window) {

            var canvas = d3.select(element[0])
                .append('svg')
                .attr("width", '100%')
                .style('background-color', 'red')
                .attr("height", '100%');

            var drag = d3.behavior.drag().on('dragstart', function() {
                    d3.select(this.children[0]).style('fill', 'yellow');
                })
                .on('drag', function() {
                    d3.select(this)
                        .attr("transform", "translate(" +
                        (d3.event.x - this.children[0].attributes.cx.value) + "," + (d3.event.y - this.children[0].attributes.cy.value) + ")");
                })
                .on('dragend', function() {
                    d3.select(this.children[0]).style('fill', 'purple');
                });

            var tasks = [{
                id: 1,
                pos: 0
            }, {
                id: 2,
                pos: 100
            }, {
                id: 3,
                pos: 200
            }];

            canvas.append("line")
                .style("stroke", "black")
                .attr("x1", 150)
                .attr("y1", 100)
                .attr("x2", 250)
                .attr("y2", 300);

            var map = _.each(tasks, function(curr) {

                var g = canvas.append('g')
                .attr('id', 'task-' + curr.id)
                .call(drag);

                g.insert("circle")
                    .attr("cx", 50 + curr.pos)
                    .attr("cy", 50)
                    .attr("r", 50).style("fill", "purple");

                g.append('text')
                    .style("fill", "white")
                    .attr("dx", 50 + curr.pos)
                    .attr("dy", 50)
                    .attr("text-anchor", "middle")
                    .text(function(d) {
                        return "test" + curr.id;
                    });

            });

            // Browser onresize event
            window.onresize = function() {
                scope.$apply();
            };

            // TODO: Watch for resize event
            scope.$watch(function() {
                //
            }, function() {
                scope.render(scope.data);
            });

            scope.render = function(data) {
                console.log('d3 rendering');
                // our custom d3 code
            };
        }
    };
});