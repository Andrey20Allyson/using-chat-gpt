export class Vector3 {
  x: number;
  y: number;
  z: number;

  static up = new Vector3(0, 1, 0);

  /**
   * Constructs a new Vector3 instance.
   * @param x The x component of the vector.
   * @param y The y component of the vector.
   * @param z The z component of the vector.
   */
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Calculates the length of the vector.
   * @returns The length of the vector.
   */
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * Normalizes the vector.
   * @returns A new Vector3 instance with the same direction as this vector and a length of 1.
   */
  normalize(): Vector3 {
    const length = this.length();
    return new Vector3(this.x / length, this.y / length, this.z / length);
  }

  /**
   * Adds a vector to this vector.
   * @param other The vector to add to this vector.
   * @returns A new Vector3 instance representing the sum of the two vectors.
   */
  add(other: Vector3): Vector3 {
    return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  /**
   * Subtracts a vector from this vector.
   * @param other The vector to subtract from this vector.
   * @returns A new Vector3 instance representing the difference of the two vectors.
   */
  subtract(other: Vector3): Vector3 {
    return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  /**
   * Calculates the dot product of this vector and another vector.
   * @param other The other vector.
   * @returns The dot product of the two vectors.
   */
  dot(other: Vector3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  /**
   * Calculates the cross product of this vector and another vector.
   * @param other The other vector.
   * @returns A new Vector3 instance representing the cross product of the two vectors.
   */
  cross(other: Vector3): Vector3 {
    return new Vector3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  /**
   * Scales the vector.
   * @param scale The scale factor.
   * @returns A new Vector3 instance representing the original vector scaled by the given factor.
   */
  scale(scale: number): Vector3 {
    return new Vector3(this.x * scale, this.y * scale, this.z * scale);
  }

  /**
   * Converts the vector to a string representation.
   * @returns The string representation of the vector.
   */
  toString(): string {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }

  static subtract(vector1: Vector3, vector2: Vector3) {
    return vector1.subtract(vector2);
  }

  static normalize(vector: Vector3) {
    return vector.normalize();
  }

  /**
   * Calculates the dot product of two vectors.
   * @param v1 The first vector.
   * @param v2 The second vector.
   * @returns The dot product of the two vectors.
   */
  static dot(v1: Vector3, v2: Vector3): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  /**
   * Calculates the cross product of two vectors.
   * @param v1 The first vector.
   * @param v2 The second vector.
   * @returns The cross product of the two vectors as a new vector.
   */
  static cross(v1: Vector3, v2: Vector3): Vector3 {
    return new Vector3(
      v1.y * v2.z - v1.z * v2.y,
      v1.z * v2.x - v1.x * v2.z,
      v1.x * v2.y - v1.y * v2.x
    );
  }
}
