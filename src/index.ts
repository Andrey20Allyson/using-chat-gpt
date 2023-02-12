export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  rotate(rotationMatrix: Matrix3): Vector3 {
    const x = this.x * rotationMatrix[0][0] + this.y * rotationMatrix[0][1] + this.z * rotationMatrix[0][2];
    const y = this.x * rotationMatrix[1][0] + this.y * rotationMatrix[1][1] + this.z * rotationMatrix[1][2];
    const z = this.x * rotationMatrix[2][0] + this.y * rotationMatrix[2][1] + this.z * rotationMatrix[2][2];
    return new Vector3(x, y, z);
  }

  sum(vector: Vector3): Vector3 {
    return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
  }
}

export type Matrix3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
];

export class Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  toMatrix3(): Matrix3 {
    const { x, y, z, w } = this;
    const x2 = x * 2;
    const y2 = y * 2;
    const z2 = z * 2;

    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;

    return [
      [1 - (yy + zz), xy - wz, xz + wy],
      [xy + wz, 1 - (xx + zz), yz - wx],
      [xz - wy, yz + wx, 1 - (xx + yy)]
    ];
  }
}

export class Cube {
  position: Vector3;
  size: Vector3;
  rotation: Quaternion;

  constructor(position: Vector3, size: Vector3, rotation: Quaternion) {
    this.position = position;
    this.size = size;
    this.rotation = rotation;
  }

  getVertices(): Vector3[] {
    const points = [
      new Vector3(-this.size.x / 2, -this.size.y / 2, this.size.z / 2),
      new Vector3(this.size.x / 2, -this.size.y / 2, this.size.z / 2),
      new Vector3(this.size.x / 2, this.size.y / 2, this.size.z / 2),
      new Vector3(-this.size.x / 2, this.size.y / 2, this.size.z / 2),
      new Vector3(-this.size.x / 2, -this.size.y / 2, -this.size.z / 2),
      new Vector3(this.size.x / 2, -this.size.y / 2, -this.size.z / 2),
      new Vector3(this.size.x / 2, this.size.y / 2, -this.size.z / 2),
      new Vector3(-this.size.x / 2, this.size.y / 2, -this.size.z / 2),
    ];

    // Rotate the eight points of the cube
    const rotationMatrix = this.rotation.toMatrix3();
    const rotatedPoints = points.map(point => point.rotate(rotationMatrix));

    // Translate the eight points to the position of the cube
    const translatedPoints = rotatedPoints.map(point => point.sum(this.position));

    return translatedPoints;
  }
}

/**
 * Detects collision between two 3D cubes.
 * 
 * @param a The first cube to be checked for collision.
 * @param b The second cube to be checked for collision.
 * 
 * @returns A boolean value indicating whether there was a collision between the two cubes.
 */
export function detectCollision(a: Cube, b: Cube): boolean {
  const aPoints: Vector3[] = a.getVertices();
  const bPoints: Vector3[] = b.getVertices();

  // Check for collisions between the two cubes
  for (let i = 0; i < aPoints.length; i++) {
    for (let j = 0; j < bPoints.length; j++) {
      if (aPoints[i].x >= bPoints[j].x - b.size.x / 2 && aPoints[i].x <= bPoints[j].x + b.size.x / 2) {
        if (aPoints[i].y >= bPoints[j].y - b.size.y / 2 && aPoints[i].y <= bPoints[j].y + b.size.y / 2) {
          if (aPoints[i].z >= bPoints[j].z - b.size.z / 2 && aPoints[i].z <= bPoints[j].z + b.size.z / 2) {
            return true;
          }
        }
      }
    }
  }

  return false;
}