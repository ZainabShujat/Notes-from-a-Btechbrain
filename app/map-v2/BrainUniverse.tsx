"use client";
      import { brainData } from "./brainData";
import { useEffect, useRef } from "react";
import {
  Application,
  Container,
  Graphics,
  Text,
  BlurFilter,
} from "pixi.js";

export default function BrainUniverse() {
  const containerRef = useRef<HTMLDivElement>(null);
  type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  level: number;
};

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new Application();

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const init = async () => {
      await app.init({
        resizeTo: window,
        background: "#05031a",
        antialias: true,
      });

      containerRef.current?.appendChild(app.canvas);

      const universe = new Container();

      app.stage.addChild(universe);

      // ==========================
      // STARS
      // ==========================

      for (let i = 0; i < 400; i++) {
        const star = new Graphics();

        const size =
          Math.random() * 2 + 0.5;

        star.circle(0, 0, size);

        star.fill(0xffffff);

        star.x =
          Math.random() *
          window.innerWidth;

        star.y =
          Math.random() *
          window.innerHeight;

        star.alpha =
          Math.random() * 0.6 + 0.2;

        universe.addChild(star);
      }

      // ==========================
      // TITLE
      // ==========================

      const title = new Text({
        text: "Brain Map",
        style: {
          fill: "#d8c5ff",
          fontSize: 72,
          fontWeight: "bold",
        },
      });

      title.anchor.set(0.5);

      title.x =
        window.innerWidth / 2;

      title.y = 120;

      universe.addChild(title);

      // ==========================
      // SUBTITLE
      // ==========================

      const subtitle = new Text({
        text: "Explore recurring ideas and connected constellations.",
        style: {
          fill: "#a0a0c0",
          fontSize: 24,
        },
      });

      subtitle.anchor.set(0.5);

      subtitle.x =
        window.innerWidth / 2;

      subtitle.y = 190;

      universe.addChild(subtitle);

      // ==========================
      // CORE GLOW
      // ==========================

      const centerX =
        window.innerWidth / 2;

      const centerY =
        window.innerHeight / 2;

      const glow =
        new Graphics();

      glow.circle(0, 0, 80);

      glow.fill("#fbbf24");

      glow.alpha = 0.25;

      glow.filters = [
        new BlurFilter({
          strength: 40,
        }),
      ];

      glow.x = centerX;
      glow.y = centerY;

      universe.addChild(glow);

      // ==========================
      // CORE NODE
      // ==========================

      const core =
        new Graphics();

      core.circle(0, 0, 50);

      core.fill("#fbbf24");

      core.x = centerX;
      core.y = centerY;

      universe.addChild(core);

      // ==========================
      // CORE LABEL
      // ==========================

      const coreLabel =
        new Text({
          text: "BTech Brain",
          style: {
            fill: "#ffffff",
            fontSize: 18,
            fontWeight: "bold",
          },
        });

      coreLabel.anchor.set(0.5);

      coreLabel.x = centerX;

      coreLabel.y =
        centerY + 90;

      universe.addChild(coreLabel);

      // ==========================
      // CATEGORY CONSTELLATIONS
      // ==========================



     brainData.categories.forEach(
  (category, categoryIndex) => {
    const categoryAngle =
      (categoryIndex /
        brainData.categories.length) *
      Math.PI *
      2;

    const categoryDistance = 320;

    const categoryX =
      centerX +
      Math.cos(categoryAngle) *
        categoryDistance;

    const categoryY =
      centerY +
      Math.sin(categoryAngle) *
        categoryDistance;

    // CATEGORY LINK

    const categoryLine =
      new Graphics();

    categoryLine.moveTo(
      centerX,
      centerY
    );

    categoryLine.lineTo(
      categoryX,
      categoryY
    );

    categoryLine.stroke({
      color: "#6a4cff",
      width: 1,
      alpha: 0.25,
    });

    universe.addChild(
      categoryLine
    );

    // CATEGORY NODE

    const categoryNode =
      new Graphics();

    categoryNode.circle(
      0,
      0,
      18
    );

    categoryNode.fill(
      "#8b5cf6"
    );

    categoryNode.x =
      categoryX;

    categoryNode.y =
      categoryY;

    universe.addChild(
      categoryNode
    );

    const categoryLabel =
      new Text({
        text: category.label,
        style: {
          fill: "#ffffff",
          fontSize: 14,
        },
      });

    categoryLabel.anchor.set(
      0.5
    );

    categoryLabel.x =
      categoryX;

    categoryLabel.y =
      categoryY + 35;

    universe.addChild(
      categoryLabel
    );

    // -------------------------
    // TAGS
    // -------------------------

    category.tags.forEach(
      (tag, tagIndex) => {
        const tagAngle =
          categoryAngle +
          (tagIndex -
            category.tags.length /
              2) *
            0.5;

        const tagDistance = 120;

        const tagX =
          categoryX +
          Math.cos(tagAngle) *
            tagDistance;

        const tagY =
          categoryY +
          Math.sin(tagAngle) *
            tagDistance;

        const tagLine =
          new Graphics();

        tagLine.moveTo(
          categoryX,
          categoryY
        );

        tagLine.lineTo(
          tagX,
          tagY
        );

        tagLine.stroke({
          color: "#4cc9f0",
          width: 1,
          alpha: 0.25,
        });

        universe.addChild(
          tagLine
        );

        const tagNode =
          new Graphics();

        tagNode.circle(
          0,
          0,
          10
        );

        tagNode.fill(
          "#4cc9f0"
        );

        tagNode.x = tagX;
        tagNode.y = tagY;

        universe.addChild(
          tagNode
        );

        // -------------------------
        // ARTICLES
        // -------------------------

        tag.articles.forEach(
          (
            article,
            articleIndex
          ) => {
            const articleAngle =
              tagAngle +
              (articleIndex -
                tag.articles.length /
                  2) *
                0.35;

            const articleDistance =
              70;

            const articleX =
              tagX +
              Math.cos(
                articleAngle
              ) *
                articleDistance;

            const articleY =
              tagY +
              Math.sin(
                articleAngle
              ) *
                articleDistance;

            const articleLine =
              new Graphics();

            articleLine.moveTo(
              tagX,
              tagY
            );

            articleLine.lineTo(
              articleX,
              articleY
            );

            articleLine.stroke({
              color: "#ff6b9d",
              width: 1,
              alpha: 0.2,
            });

            universe.addChild(
              articleLine
            );

            const articleNode =
              new Graphics();

            articleNode.circle(
              0,
              0,
              5
            );

            articleNode.fill(
              "#ff6b9d"
            );

            articleNode.x =
              articleX;

            articleNode.y =
              articleY;

            universe.addChild(
              articleNode
            );
          }
        );
      }
    );
  }
);

      // ==========================
      // DRAGGING
      // ==========================

      app.stage.eventMode =
        "static";

      app.stage.on(
        "pointerdown",
        (e) => {
          dragging = true;

          lastX =
            e.global.x;

          lastY =
            e.global.y;
        }
      );

      app.stage.on(
        "pointermove",
        (e) => {
          if (!dragging)
            return;

          const dx =
            e.global.x -
            lastX;

          const dy =
            e.global.y -
            lastY;

          universe.x += dx;
          universe.y += dy;

          lastX =
            e.global.x;

          lastY =
            e.global.y;
        }
      );

      app.stage.on(
        "pointerup",
        () => {
          dragging = false;
        }
      );

      app.stage.on(
        "pointerupoutside",
        () => {
          dragging = false;
        }
      );
    };

    init();

    return () => {
      app.destroy(true);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}