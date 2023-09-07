# WebGameEngine
web game engine host

# Game Engine Dev
Core
KeyManager
TimeManager
GameObject
Scene

# Deploy Game
https://app.netlify.com/sites/jolly-elf-bc83df/overview
https://jolly-elf-bc83df.netlify.app/

# Pixel Editor
https://www.piskelapp.com/

--disable-web-security --disable-gpu --user-data-dir=~/tmp 

<pre><code> 
    /**
   * @typedef {Object.<string, function>} Setters
   */

  /**
   * Creates setter functions for all uniforms of a shader
   * program.
   *
   * @see {@link module:webgl-utils.setUniforms}
   *
   * @param {WebGLProgram} program the program to create setters for.
   * @returns {Object.<string, function>} an object with a setter by name for each uniform
   * @memberOf module:webgl-utils
   */
  function createUniformSetters(gl, program) {
    let textureUnit = 0;

    /**
     * Creates a setter for a uniform of the given program with it's
     * location embedded in the setter.
     * @param {WebGLProgram} program
     * @param {WebGLUniformInfo} uniformInfo
     * @returns {function} the created setter.
     */
    function createUniformSetter(program, uniformInfo) {
      const location = gl.getUniformLocation(program, uniformInfo.name);
      const type = uniformInfo.type;
      // Check if this uniform is an array
      const isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]');
      if (type === gl.FLOAT && isArray) {
        return function(v) {
          gl.uniform1fv(location, v);
        };
      }
      if (type === gl.FLOAT) {
        return function(v) {
          gl.uniform1f(location, v);
        };
      }
      if (type === gl.FLOAT_VEC2) {
        return function(v) {
          gl.uniform2fv(location, v);
        };
      }
  
      -----------------중략-----------------
  
      if (type === gl.FLOAT_MAT2) {
        return function(v) {
          gl.uniformMatrix2fv(location, false, v);
        };
      }
  
      -----------------중략-----------------
  
      if ((type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) && isArray) {
        const units = [];
        for (let ii = 0; ii < info.size; ++ii) {
          units.push(textureUnit++);
        }
        return function(bindPoint, units) {
          return function(textures) {
            gl.uniform1iv(location, units);
            textures.forEach(function(texture, index) {
              gl.activeTexture(gl.TEXTURE0 + units[index]);
              gl.bindTexture(bindPoint, texture);
            });
          };
        }(getBindPointForSamplerType(gl, type), units);
      }
      if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
        return function(bindPoint, unit) {
          return function(texture) {
            gl.uniform1i(location, unit);
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(bindPoint, texture);
          };
        }(getBindPointForSamplerType(gl, type), textureUnit++);
      }
      throw ('unknown type: 0x' + type.toString(16)); // we should never get here.
    }

    const uniformSetters = { };
    const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (let ii = 0; ii < numUniforms; ++ii) {
      const uniformInfo = gl.getActiveUniform(program, ii);
      if (!uniformInfo) {
        break;
      }
      let name = uniformInfo.name;
      // remove the array suffix.
      if (name.substr(-3) === '[0]') {
        name = name.substr(0, name.length - 3);
      }
      const setter = createUniformSetter(program, uniformInfo);
      uniformSetters[name] = setter;
    }
    return uniformSetters;
  }


  /**
   * Creates setter functions for all attributes of a shader
   * program. You can pass this to {@link module:webgl-utils.setBuffersAndAttributes} to set all your buffers and attributes.
   *
   * @see {@link module:webgl-utils.setAttributes} for example
   * @param {WebGLProgram} program the program to create setters for.
   * @return {Object.<string, function>} an object with a setter for each attribute by name.
   * @memberOf module:webgl-utils
   */
 function createAttributeSetters(gl, program) {
    const attribSetters = {
    };

    function createAttribSetter(index) {
      return function(b) {
          if (b.value) {
            gl.disableVertexAttribArray(index);
            switch (b.value.length) {
              case 4:
                gl.vertexAttrib4fv(index, b.value);
                break;
              case 3:
                gl.vertexAttrib3fv(index, b.value);
                break;
              case 2:
                gl.vertexAttrib2fv(index, b.value);
                break;
              case 1:
                gl.vertexAttrib1fv(index, b.value);
                break;
              default:
                throw new Error('the length of a float constant value must be between 1 and 4!');
            }
          } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
            gl.enableVertexAttribArray(index);
            gl.vertexAttribPointer(
                index, b.numComponents || b.size, b.type || gl.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
          }
        };
    }

    const numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let ii = 0; ii < numAttribs; ++ii) {
      const attribInfo = gl.getActiveAttrib(program, ii);
      if (!attribInfo) {
        break;
      }
      const index = gl.getAttribLocation(program, attribInfo.name);
      attribSetters[attribInfo.name] = createAttribSetter(index);
    }

    return attribSetters;
  }

  /**
   * @typedef {Object} BufferInfo
   * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
   * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
   * @property {Object.<string, module:webgl-utils.AttribInfo>} attribs The attribs approriate to call `setAttributes`
   * @memberOf module:webgl-utils
   */
     
  function createBufferInfoFromArrays(gl, arrays, opt_mapping) {
    const bufferInfo = {
      attribs: createAttribsFromArrays(gl, arrays, opt_mapping),
    };
    let indices = arrays.indices;
    if (indices) {
      indices = makeTypedArray(indices, 'indices');
      bufferInfo.indices = createBufferFromTypedArray(gl, indices, gl.ELEMENT_ARRAY_BUFFER);
      bufferInfo.numElements = indices.length;
    } else {
      bufferInfo.numElements = getNumElementsFromNonIndexedArrays(arrays);
    }

    return bufferInfo;
  }

function setUniforms(setters, ...values) {
    setters = setters.uniformSetters || setters;
    for (const uniforms of values) {
      Object.keys(uniforms).forEach(function(name) {
        const setter = setters[name];
        if (setter) {
          setter(uniforms[name]);
        }
      });
    }
  }

function setBuffersAndAttributes(gl, setters, buffers) {
    setAttributes(setters, buffers.attribs);
    if (buffers.indices) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    }
  }

function setAttributes(setters, attribs) {
    setters = setters.attribSetters || setters;
    Object.keys(attribs).forEach(function(name) {
      const setter = setters[name];
      if (setter) {
        setter(attribs[name]);
      }
    });
  }
    </code></pre>
