SU.directive('d3CreateProcess', function() {
    return {
        restrict: 'EA',
        scope: {
            tasks: '=',
        },
        link: function(scope, element, attrs, $window, $rootScope) {

            var canvas = d3.select(element[0])
                .html('') // Reset the canvas so that it redraws on init command
                .append('svg')
                .attr("width", '100%')
                .style('background-color', 'red')
                .attr("height", '100%');

            var process_designer = {
                "init": function() {
                    this.destroy.canvas();
                    this.drawNodes();
                    this.drawLines();
                },
                updateTask: function(task_id, property, value) {
                    scope.tasks[task_id][property] = value;
                    // TODO: REMOVE ME
                    console.log('updated task id', task_id);
                },
                destroy: {
                    canvas: function() {
                        return canvas.html('');
                    },
                    all_lines: function() {
                        return canvas.selectAll('.dependency-line').remove();
                    }
                },
                translateElement: function(element, coordinates) {
                    coordinates.x = coordinates.x || 0;
                    coordinates.y = coordinates.y || 0;
                    return d3.select(element).attr("transform", "translate(" + coordinates.x +"," + coordinates.y + ")");
                },
                group: {
                    // NOTE: PASSING IN PROCESS DESIGNER LIKE THIS IS A LITTLE HACKY
                    create: function(process_designer, id) {
                        return canvas.append('g')
                            .attr('id', 'task-' + id)
                            .call(process_designer.handlers.drag.run());
                    },
                    insertCircle: function(g, inc) {
                        return g.insert("circle")
                            .attr("cx", 50 + inc)
                            .attr("cy", 50 + inc)
                            .attr("r", 50)
                            .style("fill", "purple");
                    },
                    addLabel: function(g, inc, text) {
                        return g.append('text')
                            .style("fill", "white")
                            .attr("dx", 50 + inc)
                            .attr("dy", 50 + inc)
                            .attr("text-anchor", "middle")
                            .text(function(d) {
                                return text;
                            });
                    }
                },
                handlers: {
                    drag: {
                        moveElementToMouseLocation: function(element, coordinates) {

                            var x_coordinate = coordinates ? coordinates.x : d3.event.x;
                            var y_coordinate = coordinates ? coordinates.y : d3.event.y;

                            return d3.select(element)
                                .attr("transform",
                                    "translate(" +
                                    // ADD CORDINATES OF THE CIRCLE INSIDE THE G(GROUP) ELEMENT
                                    (x_coordinate - element.children[0].attributes.cx.value) +
                                    "," +
                                    (y_coordinate - element.children[0].attributes.cy.value) +
                                    ")"
                                );
                        },
                        run: function() {

                            var drag_handler = this;

                            return d3.behavior.drag().on('dragstart', function() {
                                    d3.select(this.children[0]).style('fill', 'yellow');
                                })
                                .on('drag', function() {
                                    process_designer.destroy.all_lines();
                                    process_designer.drawLines();
                                    var element = this;

                                    drag_handler.moveElementToMouseLocation(element);

                                    // TODO: ADD MODULAR CONFIGURATION OF THIS TASK PREFIX
                                    var id = this.id.split('task-')[1]; // remove task prefix
                                    var scope_index = _.findIndex(scope.tasks, {
                                        'id': id
                                    });
                                    var coordinates = process_designer.getGroupNodeLocation(d3.select(this));
                                    process_designer.updateTask(scope_index, 'coordinates', coordinates);

                                })
                                .on('dragend', function() {
                                    d3.select(this.children[0]).style('fill', 'purple');
                                });
                        }
                    }
                },
                getGroupNodeLocation: function(group) {
                    var circle = group[0][0].children[0];
                    var circle_x = circle.cx.baseVal.value;
                    var circle_y = circle.cy.baseVal.value;
                    var g_x = d3.transform(group.attr("transform")).translate[0];
                    var g_y = d3.transform(group.attr("transform")).translate[1];
                    return {
                        y: circle_y + g_y,
                        x: circle_x + g_x
                    };
                },
                drawLines: function() {
                    var process_designer = this;
                    _.each(scope.tasks, function(curr) {
                        var node = canvas.select('#task-' + curr.id);
                        var start = process_designer.getGroupNodeLocation(node);
                        _.each(curr.dependencies, function(id) {
                            var node = canvas.select('#task-' + id);
                            var end = process_designer.getGroupNodeLocation(node);

                            // Draw line between dependent nodes
                            canvas.append("line")
                                .classed('dependency-line', true)
                                .style("stroke", "black")
                                .style("stroke-width", "5")
                                .attr("x1", start.x)
                                .attr("y1", start.y)
                                .attr("x2", end.x)
                                .attr("y2", end.y);
                        });
                    });
                },
                drawNodes: function() {
                    var process_designer = this;
                    // USED TO SPREAD OUT THE NODES
                    var inc = 0;

                    // CREATE A GROUP WITH A CIRCLE AND LABEL
                    _.each(scope.tasks, function(curr) {
                        var g = process_designer.group.create(process_designer, curr.id);
                        process_designer.translateElement(g[0][0], curr.coordinates || {});
                        process_designer.group.insertCircle(g, inc);
                        process_designer.group.addLabel(g, inc, curr.id);

                        // SPREAD OUT THE NODES ON LOAD
                        //inc = inc + 150;
                    });
                }
            };

            // Browser onresize event
            window.onresize = function() {
                scope.$apply();
            };

            // TODO: Watch for resize event  scope.render(scope.data);

            scope.$watch('tasks', function() {
                process_designer.init();
                console.log('init because tasks reset');
            }, true);

        }
    };
});