// import { Quaternion } from "./Quaternion";
import { Vector3 } from "./Vector3";

export class Euler {
  vector: Vector3;

  /**
   * Creates a new Euler object.
   * @param x The x-axis rotation in radians.
   * @param y The y-axis rotation in radians.
   * @param z The z-axis rotation in radians.
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.vector = new Vector3(x, y, z);
  }

  static lookAt(from: Vector3, to: Vector3): Euler {
    const x = from.x - to.x;
    const y = from.y - to.y;
    const z = from.z - to.z;
  
    const yaw = Math.atan2(y, x);
    const pitch = Math.atan2(-z, Math.sqrt(x * x + y * y));
    const roll = 0;
  
    return new Euler(pitch, yaw, roll);
  }

  /**
   * Orients the Euler rotation to look at a target point.
   * @param target The target point to look at.
   * @param up The up direction.
   */
  lookAt(target: Vector3, up: Vector3 = Vector3.up): void {
    const z = Vector3.normalize(Vector3.subtract(target, this.vector));
    const x = Vector3.normalize(Vector3.cross(up, z));
    const y = Vector3.normalize(Vector3.cross(z, x));

    this.vector.x = Math.atan2(y.y, x.y);
    this.vector.y = Math.asin(-z.y);
    this.vector.z = Math.atan2(y.x, x.x);
  }

  /**
   * Rotates the Euler rotation around the x, y, and z axes.
   * @param x The x-axis rotation in radians.
   * @param y The y-axis rotation in radians.
   * @param z The z-axis rotation in radians.
   */
  rotate(x: number, y: number, z: number): void {
    this.vector.x += x;
    this.vector.y += y;
    this.vector.z += z;
  }

  /**
   * Rotates the Euler rotation around an arbitrary axis.
   * @param axis The axis to rotate around.
   * @param angle The angle to rotate in radians.
   */
  // rotateInAxis(axis: Vector3, angle: number): void {
  //   const quaternion = new Quaternion();
  //   // quaternion.setFromAxisAngle(axis, angle);
  //   this.applyQuaternion(quaternion);
  // }

  /**
   * Applies a quaternion rotation to the Euler rotation.
   * @param q The quaternion to apply.
   */
  // applyQuaternion(q: Quaternion): void {
  //   // ... implementation
  // }

  /**
   * Converts the Euler rotation to a string representation.
   * @returns The string representation of the Euler rotation.
   */
  toString(): string {
    return `(${this.vector.x}, ${this.vector.y}, ${this.vector.z})`;
  }
}