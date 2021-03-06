// Copyright (C) 2020 Dmytro Meleshko
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import runPostload from './postload.js';

export default class LibshaderPlugin {
  constructor(mod) {
    this.baseDirectory = mod.baseDirectory;
  }

  /**
   * @param {string} path
   * @returns {Promise<string>}
   */
  async readFile(path) {
    return ccmod.resources.loadText(`/${this.baseDirectory}${path}`);
  }

  /**
   * @param {string} path
   * @returns {Promise<HTMLImageElement>}
   */
  async loadImage(path) {
    return ccmod.resources.loadImage(`/${this.baseDirectory}${path}`);
  }

  async postload() {
    let [
      vertexShaderSrc,
      fragmentShaderSrc,
      lutTextureData,
    ] = await Promise.all([
      this.readFile('shader.vert'),
      this.readFile('shader.frag'),
      this.loadImage('lut.png'),
    ]);
    return runPostload(vertexShaderSrc, fragmentShaderSrc, lutTextureData);
  }
}
