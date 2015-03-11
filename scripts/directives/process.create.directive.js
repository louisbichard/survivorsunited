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
                //.style('background-color', 'red')
                .attr("height", '100%')
                .on('click', function(d, i) {
                      d3.event.stopPropagation();

                    console.log('clicked chart area');
                });


            var process_designer = {
                "init": function() {
                    this.destroy.canvas();
                    this.drawNodes();
                    this.drawLines();
                },
                config: {
                    task: {
                        // WHEN CREATING A TASK, THIS IS WHERE IT WILL APPEAR, (I.E 50 PIXELS FROM THE TOP & LEFT)
                        location_offset: 100,
                        radius: 70
                    }
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
                    return d3.select(element).attr("transform", "translate(" + coordinates.x + "," + coordinates.y + ")");
                },
                group: {
                    // NOTE: PASSING IN PROCESS DESIGNER LIKE THIS IS A LITTLE HACKY
                    create: function(process_designer, id) {
                        return canvas.append('g')
                            .attr('id', 'task-' + id)
                            .call(process_designer.handlers.drag.run());
                    },
                    insertCircle: function(g) {
                        return g.insert("circle")
                            .attr("cx", process_designer.config.task.location_offset)
                            .attr("cy", process_designer.config.task.location_offset)
                            .attr("r", process_designer.config.task.radius)
                            .style("fill", "purple");
                    },
                    addLabel: function(g, text) {
                        return g.append('text')
                            .style("fill", "white")
                            .attr("dx", process_designer.config.task.location_offset)
                            .attr("dy", process_designer.config.task.location_offset)
                            .attr("text-anchor", "middle")
                            .text(function(d) {
                                return text;
                            });
                    }
                },
                handlers: {
                    drag: {
                        moveElementToMouseLocation: function(element, coordinates) {
                            return d3.select(element)
                                .attr("transform",
                                    "translate(" +
                                    // ADD CORDINATES OF THE CIRCLE INSIDE THE G(GROUP) ELEMENT
                                    (d3.event.x - element.children[0].attributes.cx.value) +
                                    "," +
                                    (d3.event.y - element.children[0].attributes.cy.value) +
                                    ")"
                                );
                        },
                        run: function() {

                            var drag_handler = this;

                            return d3.behavior.drag().on('dragstart', function() {
                                    d3.select(this.children[0]).style('fill', 'lightpurple');
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
                    var g_x = d3.transform(group.attr("transform")).translate[0];
                    var g_y = d3.transform(group.attr("transform")).translate[1];
                    return {
                        y: g_y + process_designer.config.task.location_offset,
                        x: g_x + process_designer.config.task.location_offset
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
                            canvas
                                .insert("line", ":first-child")
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
                    // CREATE A GROUP WITH A CIRCLE AND LABEL
                    _.each(scope.tasks, function(curr) {
                        var g = process_designer.group.create(process_designer, curr.id);
                        process_designer.translateElement(g[0][0], curr.coordinates || {});
                        process_designer.group.insertCircle(g);
                        process_designer.group.addLabel(g, curr.name);
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