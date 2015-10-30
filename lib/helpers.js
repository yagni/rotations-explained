import THREE from 'three';

export function convertMatrix3ToMatrix4(m3) {
  const m4 = new THREE.Matrix4();
  m4.set(m3.elements[0], m3.elements[3], m3.elements[6], 0,
    m3.elements[1], m3.elements[4], m3.elements[7], 0,
    m3.elements[2], m3.elements[5], m3.elements[8], 0,
    0, 0, 0, 1);
  return m4;
}
