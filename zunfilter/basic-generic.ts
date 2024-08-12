const Shape = {
  Triangle: 'Triangle',
  Square: 'Square',
  Rectangle: 'Rectangle',
  Circle: 'Circle',
} as const;

const CalculateShape = {
  Area: 'Area',
  Perimeter: 'Perimeter',
  // Volumetric: 'volumetric'
};

type ShapeType = keyof typeof Shape;
type CalculateShapeType = keyof typeof CalculateShape;

interface Triangle {
  a: number;
  b: number;
  c: number;
  h: number;
}

interface Rectangle {
  a: number;
  b: number;
}

type Square = Pick<Rectangle, 'a'>;

interface Circle {
  r: number;
}

type CombineShapeType = {
  Triangle: Triangle;
  Square: Square;
  Rectangle: Rectangle;
  Circle: Circle;
}

interface ShapeInstance {
  Triangle: () => number;
  Square: () => number;
  Rectangle: () => number;
  Circle: () => number;
}

interface ShapeTypeInstance {
  Area: ShapeInstance;
  Perimeter: ShapeInstance;
}

function AreaOfPerimeterCalculator<L extends CalculateShapeType, T extends ShapeType>(calculateType: L, shape: T, props: CombineShapeType[T]) {
  const shapeInstance: ShapeTypeInstance = {
    Area: {
      Triangle: () => {
        const { c, h } = props as Triangle;
        return (c * h) / 2;
      },
      Square: () => {
        const { a } = props as Square;
        return a ** 2;
      },
      Rectangle: () => {
        const { a, b } = props as Rectangle;
        return a * b;
      },
      Circle: () => {
        const { r } = props as Circle;
        return Math.PI * (r ** 2);
      }
    },
    Perimeter: {
      Triangle: () => {
        const { a, b, c } = props as Triangle;
        return a + b + c;
      },
      Square: () => {
        const { a } = props as Square;
        return a * 4;
      },
      Rectangle: () => {
        const { a, b } = props as Rectangle;
        return a * b;
      },
      Circle: () => {
        const { r } = props as Circle;
        return 2 * Math.PI * r;
      }
    }
  };
  return shapeInstance[calculateType][shape]();
}

console.log(AreaOfPerimeterCalculator('Perimeter', 'Circle', { r: 12 }));
console.log(AreaOfPerimeterCalculator('Perimeter', 'Square', { a: 2 }));
console.log(AreaOfPerimeterCalculator('Area', 'Square', { a: 2 }));
