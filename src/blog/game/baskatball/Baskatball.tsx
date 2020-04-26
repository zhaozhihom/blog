import React, {useEffect, useRef} from 'react';
import Matter from "matter-js";

export default function Basketball(props: any) {

  const screen = useRef();

  // module aliases
  let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  Body = Matter.Body,
  Runner = Matter.Runner,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Vector = Matter.Vector;

  useEffect(() => {

      // create an engine
    let engine = Engine.create();

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // create a renderer
    var render = Render.create({
      element: screen.current,
      engine: engine,
      options: {
        width: 912,
        wireframes: false
      }
    });

    // create two boxes and a ground
    var ball = Bodies.circle(503, 212, 30, {
      restitution: 0.9, // 弹性
      density: 0.068, // 密度
      render: {
        visible: true, // 开启渲染
        sprite: {
          texture: 'image/ball.png', // 设置为篮球图
          xScale: 1.55, // x 设置为中心点
          yScale: 1.55 // y 设置为中心点
        }
      }
    });
    var ground = Bodies.rectangle(456, 595, 912, 20, { isStatic: true });
    var rebound = Bodies.rectangle(5, 150, 10, 2000, { isStatic: true });
    var rebound2 = Bodies.rectangle(905, 650, 10, 800, { isStatic: true });
    var hoop = Bodies.rectangle(15, 195, 15, 15, { isStatic: true });
    var hoop1 = Bodies.rectangle(105, 195, 15, 15, { isStatic: true });
    var group = Body.nextGroup(true),
        particleOptions = { 
          firction: 1, // 摩擦力
          frictionAir: 0.08, // 空气摩擦力
          restitution: 0, // 弹性
          collisionFilter: { group: group },
           render: { visible: false }
        },
        constraintOptions = { stiffness: 0.06, lineWidth: 2, strokeStyle: "#fff"},
        cloth = Composites.softBody(15, 195, 6, 4, 0, 0, false, 8, particleOptions, constraintOptions);

    // for (var i = 0; i < 6; i++) {
    //   cloth.bodies[i].isStatic = true;
    // }
    cloth.bodies[0].isStatic = true;
    cloth.bodies[5].isStatic = true;
    // add all of the bodies to the world
    World.add(engine.world, [cloth, ball, ground, rebound,rebound2, hoop, hoop1]);
    
    var ball1 = Bodies.circle(1000, 10, 20, { density: 1, frictionAir: 0, restitution: 0.9});
    var bang = Bodies.rectangle(480, 250, 20, 10, { isStatic: true, angle: - Math.PI / 4 });
    var bang1 = Bodies.rectangle(530, 200, 20, 10, { isStatic: true, angle: - Math.PI / 4 });
    World.add(engine.world, [ball1, bang, bang1]);
    World.add(engine.world, Constraint.create({
        pointA: { x: 700, y: 0 },
        bodyB: ball1
    }));


    // // add bodies
    // var groupx = Body.nextGroup(true);

    // // var stack = Composites.stack(250, 255, 1, 6, 0, 0, function(x, y) {
    // //     return Bodies.rectangle(x, y, 30, 30);
    // // });

    // var catapult = Bodies.rectangle(620, 380, 560, 20, { collisionFilter: { group: groupx } }),
    //     pile = Bodies.rectangle(757, 415, 295, 20, { isStatic: true }),
    //     mat = Bodies.rectangle(807, 399, 20, 15, { isStatic: true });
    //     // catapultGroup = Body.create({
    //     //       parts: [catapult, cut1, cut2]
    //     // });

    // World.add(engine.world, [
    //     catapult,
    //     pile,
    //     mat,
    //     Bodies.trapezoid(300, 135, 60, 60, 0.5, {density: 100000}),
    //     Bodies.rectangle(620, 380, 20, 50, { isStatic: true, collisionFilter: { group: groupx } }),
    //     Constraint.create({ 
    //         bodyA: catapult, 
    //         pointB: Vector.clone(catapult.position),
    //         stiffness: 1,
    //         length: 0
    //     })
    // ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(engine.world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);

    return () => {
      render.canvas.remove();
    }
  });

  return (
    <div ref={screen}></div>
  )

}