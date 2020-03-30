import React, {useEffect, useRef} from 'react';
import Matter from "matter-js";

export default function Basketball(props: any) {

  const screen = useRef();

  useEffect(() => {
    // module aliases
    let Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        Body = Matter.Body,
        Runner = Matter.Runner,
        Vector = Matter.Vector;

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
        wireframes: false,
        background: "#d3d3d3"
      }
    });

    // create two boxes and a ground
    var ball = Bodies.circle(800, 435, 30, {
      restitution: 0.8, // 弹性
      density: 0.68, // 密度
      render: {
        visible: true, // 开启渲染
        sprite: {
          texture: 'image/ball.png', // 设置为篮球图
          xScale: 1.55, // x 设置为中心点
          yScale: 1.55 // y 设置为中心点
        }
      }
    });
    var ground = Bodies.rectangle(456, 595, 912, 20, { isStatic: true, render: {
      fillStyle: "#696969"
    }});
    var rebound = Bodies.rectangle(5, 150, 10, 200, { isStatic: true , render: {
      fillStyle: "#696969"
    }});
    var hoop = Bodies.rectangle(15, 195, 15, 15, { isStatic: true, render: {
      fillStyle: "#696969"
    }});
    var hoop1 = Bodies.rectangle(105, 195, 15, 15, { isStatic: true, render: {
      fillStyle: "#696969"
    }});
    var group = Body.nextGroup(true),
        particleOptions = { 
          firction: 1, // 摩擦力
          frictionAir: 0.08, // 空气摩擦力
          restitution: 0, // 弹性
          collisionFilter: { group: group }, render: { visible: false }},
        constraintOptions = { stiffness: 0.06, lineWidth: 2, strokeStyle: "#fff"},
        cloth = Composites.softBody(15, 195, 6, 4, 0, 0, false, 8, particleOptions, constraintOptions);

    // for (var i = 0; i < 6; i++) {
    //   cloth.bodies[i].isStatic = true;
    // }
    cloth.bodies[0].isStatic = true;
    cloth.bodies[5].isStatic = true;
    // add all of the bodies to the world
    World.add(engine.world, [cloth, ball, ground, rebound, hoop, hoop1]);

    // add bodies
    var groupx = Body.nextGroup(true);

    // var stack = Composites.stack(250, 255, 1, 6, 0, 0, function(x, y) {
    //     return Bodies.rectangle(x, y, 30, 30);
    // });

    var catapult = Bodies.rectangle(650, 520, 320, 20, { collisionFilter: { group: groupx } });

    World.add(engine.world, [
        catapult,
        // Bodies.circle(500, 135, 40),
        Bodies.rectangle(650, 535, 20, 100, { isStatic: true, collisionFilter: { group: groupx } }),
        Constraint.create({ 
            bodyA: catapult, 
            pointB: Vector.clone(catapult.position),
            stiffness: 1,
            length: 0
        })
    ]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
  });

  return (
    <div ref={screen}></div>
  )

}